const TelegramBot = require('node-telegram-bot-api');
const openai = require('openai');

// Token de acesso do bot
const token = '6195464710:AAGwZpUKI27a8OCPLGXbnevgEW350bXPn6U';

// Chave de API da OpenAI
const openaiKey = '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';

// Cria um objeto bot
const bot = new TelegramBot(token, { polling: true });

// Configura a API da OpenAI
const openaiEngine = 'text-davinci-002';
openai.apiKey = openaiKey;

// Função para lidar com o comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Olá, eu sou o ChatGPT! Como posso ajudar?');
});

// Função para lidar com as mensagens recebidas
bot.on('message', async (msg) => {
  // Obtém a mensagem do usuário
  const userMessage = msg.text;

  // Faz a integração com o ChatGPT para gerar uma resposta
  const chatgptResponse = await generateResponse(userMessage);

  // Envia a resposta para o usuário
  bot.sendMessage(msg.chat.id, chatgptResponse);
});

// Função para gerar uma resposta usando o ChatGPT
async function generateResponse(userMessage) {
  // Configura as opções para a requisição à API da OpenAI
  const prompt = `Usuário: ${userMessage}\nChatGPT:`;
  const completions = 1;
  const maxTokens = 150;
  const engine = openaiEngine;

  // Faz a requisição à API da OpenAI
  const response = await openai.complete({
    engine,
    prompt,
    maxTokens,
    n: completions,
  });

  // Obtém a resposta gerada pelo ChatGPT
  const chatgptResponse = response.data.choices[0].text.trim();

  // Retorna a resposta gerada pelo ChatGPT
  return chatgptResponse;
}
