import { Router } from "express";
const cardRouter = new Router();
import cardController from "../controllers/cardController.js";
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";

cardRouter.post("/", checkRoleMiddleWare("ADMIN"), cardController.create);
cardRouter.post(
  "/examples",
  checkRoleMiddleWare("ADMIN"),
  cardController.createExamples,
);

cardRouter.patch("/:id", checkRoleMiddleWare("ADMIN"), cardController.update);

cardRouter.delete("/", checkRoleMiddleWare("ADMIN"), cardController.deleteAll);
cardRouter.delete(
  "/:id",
  checkRoleMiddleWare("ADMIN"),
  cardController.deleteOne,
);

cardRouter.get("/", cardController.getAll);
cardRouter.get("/:id", cardController.getOne);

export default cardRouter;
