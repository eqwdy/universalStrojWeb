import express from "express";
import multer from "multer";
import botController from "../controllers/botController.js";

const botRouter = express.Router();

const upload = multer();
botRouter.post("/sendData", upload.none(), botController.sendMessage);

export default botRouter;
