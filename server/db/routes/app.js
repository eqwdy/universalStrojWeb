import { Router } from "express";
import cardRouter from "./cardRouter.js";
import userRouter from "./userRouter.js";
const dbRouter = new Router();

dbRouter.use("/user", userRouter);
dbRouter.use("/card", cardRouter);

export default dbRouter;
