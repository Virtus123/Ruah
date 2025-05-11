// Configuração da URL base da API
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:10000' 
  : 'https://ruah.onrender.com';

// Elementos do DOM
const chatContainer = document.getElementById('chat');
const questionInput = document.getElementById('question');
const verseElement = document.getElementById('verse');
const loadingElement = document.getElementById('loading');
const themeButtons = document.querySelectorAll('.theme-btn');

// Gerenciamento de tema
function setTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    localStorage.setItem('theme', themeName);
    
    // Atualizar botões ativos
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

// Inicializar tema
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Event listeners para os botões de tema
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// Carregar um versículo aleatório ao iniciar
async function loadRandomVerse() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/verse`);
        if (!response.ok) throw new Error('Erro na rede');
        const data = await response.json();
        verseElement.textContent = data.verse;
    } catch (error) {
        console.error('Erro ao carregar versículo:', error);
        verseElement.textContent = 'Erro ao carregar versículo';
    }
}

// Função para adicionar mensagem ao chat
function addMessage(text, isQuestion = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isQuestion ? 'question' : ''}`;
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Função para processar a pergunta
async function askQuestion() {
    const question = questionInput.value.trim();
    
    if (!question) return;

    // Adiciona a pergunta ao chat
    addMessage(question, true);
    
    // Limpa o input e mostra loading
    questionInput.value = '';
    loadingElement.style.display = 'block';

    try {
        const response = await fetch(`${API_BASE_URL}/api/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na API');
        }

        const data = await response.json();
        
        // Adiciona a resposta ao chat
        addMessage(data.answer || data.message);
        
        // Adiciona o efeito de luz divina
        const divineLight = document.createElement('div');
        divineLight.className = 'divine-light';
        document.body.appendChild(divineLight);
        
        // Remove o elemento após a animação
        setTimeout(() => {
            divineLight.remove();
        }, 2000);
    } catch (error) {
        console.error('Erro:', error);
        addMessage('Desculpe, houve um erro ao processar sua pergunta. Por favor, tente novamente.');
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Event listener para o Enter no input
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        askQuestion();
    }
});

// Funções para os recursos espirituais
async function loadThemes() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/themes`);
        if (!response.ok) throw new Error('Erro ao carregar temas');
        const data = await response.json();
        const select = document.getElementById('verseTheme');
        
        data.themes.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar temas:', error);
    }
}

async function searchVerses() {
    const theme = document.getElementById('verseTheme').value;
    if (!theme) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/verses/${theme}`);
        if (!response.ok) throw new Error('Erro ao buscar versículos');
        const data = await response.json();
        const resultsDiv = document.getElementById('versesResults');
        resultsDiv.innerHTML = '';

        data.verses.forEach(verse => {
            const verseCard = document.createElement('div');
            verseCard.className = 'verse-card';
            verseCard.innerHTML = `
                <div>${verse.texto}</div>
                <span class="verse-reference">${verse.referencia}</span>
            `;
            resultsDiv.appendChild(verseCard);
        });
    } catch (error) {
        console.error('Erro ao buscar versículos:', error);
        document.getElementById('versesResults').innerHTML = 
            '<p class="error-message">Erro ao carregar versículos</p>';
    }
}

async function loadPrayers() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/prayer-needs`);
        if (!response.ok) throw new Error('Erro ao carregar necessidades de oração');
        const data = await response.json();
        const prayersList = document.getElementById('prayersList');
        prayersList.innerHTML = '';

        for (const need of data.needs) {
            try {
                const prayerResponse = await fetch(`${API_BASE_URL}/api/prayers/${need}`);
                if (!prayerResponse.ok) continue;
                
                const prayerData = await prayerResponse.json();
                const prayer = prayerData.prayer;

                const prayerCard = document.createElement('div');
                prayerCard.className = 'prayer-card';
                prayerCard.innerHTML = `
                    <h3>${prayer.titulo}</h3>
                    <p>${prayer.texto}</p>
                    <span class="verse-reference">${prayer.versiculo}</span>
                `;
                prayersList.appendChild(prayerCard);
            } catch (error) {
                console.error(`Erro ao carregar oração para ${need}:`, error);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar orações:', error);
        document.getElementById('prayersList').innerHTML = 
            '<p class="error-message">Erro ao carregar orações</p>';
    }
}

async function loadCalendar() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/calendar`);
        if (!response.ok) throw new Error('Erro ao carregar calendário');
        const data = await response.json();
        const calendarDiv = document.getElementById('calendarEvents');
        calendarDiv.innerHTML = '';

        // Exibir evento atual
        if (data.currentEvent) {
            const currentEventCard = document.createElement('div');
            currentEventCard.className = 'event-card current-event';
            currentEventCard.style.borderColor = data.currentEvent.cor;
            currentEventCard.innerHTML = `
                <div class="event-badge">ATUAL</div>
                <h3>${data.currentEvent.nome}</h3>
                <p>${data.currentEvent.descricao}</p>
                <div class="event-readings">
                    <h4>Leituras do Dia:</h4>
                    <ul>
                        ${data.currentEvent.leituras.map(leitura => `<li>${leitura}</li>`).join('')}
                    </ul>
                </div>
            `;
            calendarDiv.appendChild(currentEventCard);
        }

        // Exibir contagem regressiva
        if (data.countdown) {
            const countdownCard = document.createElement('div');
            countdownCard.className = 'countdown-card';
            countdownCard.innerHTML = `
                <h3>Próximo Evento</h3>
                <div class="countdown-info">
                    <span class="countdown-days">${data.countdown.days}</span>
                    <span class="countdown-label">dias para</span>
                    <span class="countdown-event">${data.countdown.event}</span>
                </div>
            `;
            calendarDiv.appendChild(countdownCard);
        }

        // Exibir todos os eventos
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'events-timeline';
        
        data.events.forEach(event => {
            const startDate = new Date(event.inicio);
            const endDate = new Date(event.fim);
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.style.borderColor = event.cor;
            eventCard.innerHTML = `
                <div class="event-date">${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}</div>
                <h3>${event.nome}</h3>
                <p>${event.descricao}</p>
                <div class="event-readings">
                    <h4>Leituras Sugeridas:</h4>
                    <ul>
                        ${event.leituras.map(leitura => `<li>${leitura}</li>`).join('')}
                    </ul>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });

        calendarDiv.appendChild(eventsContainer);
    } catch (error) {
        console.error('Erro ao carregar calendário:', error);
        document.getElementById('calendarEvents').innerHTML = 
            '<p class="error-message">Erro ao carregar calendário litúrgico</p>';
    }
}

// Gerenciamento de tabs
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${button.dataset.tab}Tab`).classList.add('active');
    });
});

// Timer de meditação
let timerInterval;
let timerRunning = false;
let timeLeft = 300; // 5 minutos em segundos

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('meditationTimer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    const button = document.getElementById('timerButton');
    
    if (!timerRunning) {
        timerRunning = true;
        button.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                button.innerHTML = '<i class="fas fa-play"></i> Iniciar';
                timeLeft = 300;
                updateTimerDisplay();
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
        button.innerHTML = '<i class="fas fa-play"></i> Continuar';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadRandomVerse();
    loadThemes();
    loadPrayers();
    loadCalendar();
    setInterval(loadRandomVerse, 60000);
    updateTimerDisplay();
});
