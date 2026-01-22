import bot from "../bot.js";
import ApiError from "../../error/ApiError.js";

class botController {
  async sendMessage(req, res, next) {
    const { formName, formTel, formMessage, products } = req.body || {};
    if (!formName || formName.trim().length < 1) {
      return next(ApiError.badRequest("Missing or empty name"));
    }

    if (!formTel || formTel.trim().length < 10) {
      return next(ApiError.badRequest("Missing or empty telephone"));
    }

    let message = `Имя: ${formName}\nТелефон: ${formTel}`;

    if (formMessage) {
      message += `\nСообщение: ${formMessage}`;
    }

    if (products) {
      let productsParsed = [];
      try {
        productsParsed = JSON.parse(products);
        if (!Array.isArray(productsParsed)) {
          return next(ApiError.badRequest("products должен быть массивом"));
        }
      } catch (err) {
        console.error("Ошибка парсинга products:", err);
        return next(ApiError.badRequest("Некорректный формат JSON в products"));
      }

      if (productsParsed) {
        let productsMessage = `\nТовары:`;

        for (let product of productsParsed) {
          let productMessage = `
      Продукт: ${product.title}
      Тип: ${product.type || ""}
      Размер: ${product.size || ""}
      Цвет: ${product.color || ""}
      Количество: ${product.quantity} м²
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
      await bot.sendMessage(process.env.BOT_CHATID, message);
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("Ошибка при отправке в Telegram:", error);
      return next(ApiError.internal(error.message));
    }
  }
}

export default new botController();
