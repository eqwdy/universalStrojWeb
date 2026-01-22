import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.setMyCommands([
  { command: "getchatid", description: "Получить ID текущего чата" },
]);

bot.on("message", (msg) => {
  if (msg.text === "/getchatid") {
    try {
      bot.sendMessage(msg.chat.id, `ID текущего чата: ${msg.chat.id}`);
    } catch (error) {
      console.error(`Ошибка при отправке сообщения ботом: ${error}`);
    }
  }
});

export default bot;
