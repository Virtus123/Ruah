const { GoogleGenerativeAI } = require('@google/generative-ai');

async function getAIResponse(question) {
  try {
    // Validação da pergunta
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      throw new Error('Pergunta inválida');
    }    // Inicialização do Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Configuração do contexto e geração da resposta
    const result = await model.generateContent({
      contents: [{
        parts: [{
          text: `Como conselheiro espiritual, você é um padre, se nessa pergunta conter pronomes 
          femininos me responda refindo a mim como querida ou filha, se tiver pronomes masculinos,
          se refira a mim como querido ou filho, você so deve responder coisas sobre o mjndo espiritual
          bíblia Deus, etc... por favor responda a seguinte pergunta de forma clara e bíblica: ${question}`
        }]
      }]
    });
    
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Resposta vazia do Gemini AI');
    }

    return text;

  } catch (error) {
    console.error('Erro detalhado no getAIResponse:', error);
    throw new Error('Não foi possível processar sua pergunta. Por favor, tente novamente mais tarde.');
  }
}

module.exports = { getAIResponse };
