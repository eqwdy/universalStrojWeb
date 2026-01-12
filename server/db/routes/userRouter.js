import { Router } from "express";
const userRouter = new Router();
import userController from "../controllers/userController.js";

userRouter.post("/register", userController.registration);
userRouter.post("/login", userController.login);

userRouter.get("/auth", userController.check);

export default userRouter;
