import bot from "../bot.js";
import ApiError from "../../error/ApiError.js";
import dotenv from "dotenv";
dotenv.config();
const CHATID = process.env.BOT_CHATID;

class botController {
  async sendMessage(req, res) {
    const { formName, formTel, formMessage, products } = req.body;
    if (!formName || formName.trim().length < 1) {
      return ApiError.badRequest("Missing or empty name");
    }

    if (!formTel || formTel.trim().length < 10) {
      return ApiError.badRequest("Missing or empty telephone");
    }

    let message = `Имя: ${formName}\nТелефон: ${formTel}`;

    if (formMessage) {
      message += `\nСообщение: ${formMessage}`;
    }

    if (products) {
      let productsParsed = [];
      try {
        productsParsed = JSON.parse(products);
      } catch (err) {
        return ApiError.badRequest("Invalid products JSON");
      }

      if (productsParsed && Array.isArray(productsParsed)) {
        let productsMessage = `\nТовары:`;

        for (let product of productsParsed) {
          let productMessage = `
      Продукт: ${product.title}
      Тип: ${product.type || ""}
      Размер: ${product.size || ""}
      Цвет: ${product.color || ""}
      Количество: ${product.quantity}
      Цена: ${product.price}
    `;
          productsMessage += productMessage;
        }

        message += productsMessage;
      }
    }

    const nowDate = new Date();
    const formattedTime = nowDate.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    message += `\nВремя отправки: ${formattedTime}`;

    try {
      await bot.sendMessage(CHATID, message);
      res.status(200).json({ status: "success" });
    } catch (error) {
      return ApiError.internal(error);
    }
  }
}

export default new botController();
