const express = require('express');
const cors = require('cors');
const path = require('path');
const { getAIResponse } = require('./src/api/gemini');
const { getRandomVerse } = require('./src/utils/verses');
const { versiculosPorTema, oracoesPorNecessidade, calendarioLiturgico } = require('./src/utils/biblicalData');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// Configuração de CORS mais segura
const corsOptions = {
  origin: [
    'http://localhost:10000',
    'https://ruah.onrender.com'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor' });
});

// Rota para verificação de saúde do serviço
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Rota para obter um versículo aleatório
app.get('/api/verse', (req, res) => {
  try {
    const verse = getRandomVerse();
    if (!verse) {
      return res.status(404).json({ error: 'Nenhum versículo disponível' });
    }
    res.json({ verse });
  } catch (error) {
    console.error('Erro ao obter versículo:', error);
    res.status(500).json({ error: 'Erro ao obter versículo' });
  }
});

// Rota para processar perguntas com IA
app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Por favor, forneça uma pergunta válida' });
    }

    console.log(`Processando pergunta: "${question}"`);
    const answer = await getAIResponse(question.trim());
    
    if (!answer) {
      return res.status(500).json({ error: 'Resposta vazia da API de IA' });
    }

    res.json({ answer });
  } catch (error) {
    console.error('Erro ao processar pergunta:', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    
    const statusCode = error.message.includes('API') ? 502 : 500;
    res.status(statusCode).json({ 
      error: 'Erro ao processar sua pergunta',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Rota para buscar versículos por tema
app.get('/api/verses/:theme', (req, res) => {
  try {
    const { theme } = req.params;
    if (!versiculosPorTema.hasOwnProperty(theme)) {
      return res.status(404).json({ error: 'Tema não encontrado' });
    }
    
    const verses = versiculosPorTema[theme];
    res.json({ 
      theme,
      count: verses.length,
      verses 
    });
  } catch (error) {
    console.error('Erro ao buscar versículos por tema:', error);
    res.status(500).json({ error: 'Erro ao buscar versículos' });
  }
});

// Rota para buscar orações por necessidade
app.get('/api/prayers/:need', (req, res) => {
  try {
    const { need } = req.params;
    const prayer = oracoesPorNecessidade[need];
    
    if (!prayer) {
      return res.status(404).json({ error: 'Oração não encontrada para esta necessidade' });
    }
    
    res.json({ prayer });
  } catch (error) {
    console.error('Erro ao buscar oração:', error);
    res.status(500).json({ error: 'Erro ao buscar oração' });
  }
});

// Rota para obter eventos do calendário litúrgico
app.get('/api/calendar', (req, res) => {
  try {
    const currentDate = new Date();
    
    const currentEvent = calendarioLiturgico.eventos.find(event => {
      const start = new Date(event.inicio);
      const end = new Date(event.fim);
      return currentDate >= start && currentDate <= end;
    });

    const nextEvent = calendarioLiturgico.eventos.find(event => {
      const start = new Date(event.inicio);
      return currentDate < start;
    });

    let countdown = null;
    if (nextEvent) {
      const start = new Date(nextEvent.inicio);
      const diffTime = Math.abs(start - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      countdown = {
        event: nextEvent.nome,
        days: diffDays
      };
    }

    res.json({
      currentDate: currentDate.toISOString(),
      currentEvent,
      nextEvent,
      countdown,
      events: calendarioLiturgico.eventos.map(event => ({
        ...event,
        inicio: new Date(event.inicio).toISOString(),
        fim: new Date(event.fim).toISOString()
      })),
      temposLiturgicos: calendarioLiturgico.temposLiturgicos
    });
  } catch (error) {
    console.error('Erro ao obter calendário litúrgico:', error);
    res.status(500).json({ error: 'Erro ao obter calendário litúrgico' });
  }
});

// Rota para obter todos os temas disponíveis
app.get('/api/themes', (req, res) => {
  try {
    const themes = Object.keys(versiculosPorTema);
    res.json({ 
      count: themes.length,
      themes 
    });
  } catch (error) {
    console.error('Erro ao obter temas:', error);
    res.status(500).json({ error: 'Erro ao obter temas' });
  }
});

// Rota para obter todas as necessidades de oração disponíveis
app.get('/api/prayer-needs', (req, res) => {
  try {
    const needs = Object.keys(oracoesPorNecessidade);
    res.json({ 
      count: needs.length,
      needs 
    });
  } catch (error) {
    console.error('Erro ao obter necessidades de oração:', error);
    res.status(500).json({ error: 'Erro ao obter necessidades de oração' });
  }
});

// Rota de fallback para 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Ambiente:', process.env.NODE_ENV || 'development');
  console.log('Versão:', process.env.npm_package_version || '1.0.0');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada em:', promise, 'motivo:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Exceção não capturada:', error);
  process.exit(1);
});
