import { Router } from "express";
const cardRouter = new Router();
import cardController from "../controllers/cardController.js";

cardRouter.post("/", cardController.create);

cardRouter.get("/", cardController.getAll);
cardRouter.get("/:id", cardController.getOne);

export default cardRouter;
