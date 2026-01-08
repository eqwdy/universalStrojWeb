import bot from "../bot.js";
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const CHATID = process.env.BOT_CHATID;
const router = express.Router();

const upload = multer();
router.post("/", upload.none(), async (req, res) => {
  const { formName, formTel, formMessage } = req.body;
  if (!formName || formName.trim().length < 1) {
    return res
      .status(400)
      .json({ status: "error", errorType: "Missing or empty name" });
  }
  if (!formTel || formTel.trim().length < 10) {
    return res
      .status(400)
      .json({ status: "error", errorType: "Missing or empty tel" });
  }

  let message = `Имя: ${formName}\nТелефон: ${formTel}`;
  if (formMessage) {
    message += `\nСообщение: ${formMessage}`;
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
    res.status(500).json({ status: "error", errorType: error });
  }
});

export default router;
