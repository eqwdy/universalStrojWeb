import { Router } from "express";
const userRouter = new Router();
import userController from "../controllers/userController.js";
import authMiddleWare from "../../middleware/authMiddleWare.js";
import checkRoleMiddleWare from "../../middleware/checkRoleMiddleWare.js";

// CONTROL USERS
userRouter.post("/register", userController.registration);
userRouter.post("/login", userController.login);

userRouter.get("/auth", authMiddleWare, userController.check);

userRouter.get("/", checkRoleMiddleWare("ADMIN"), userController.getAll);
// userRouter.get("/me", authMiddleWare, userController.getUser);

userRouter.delete("/:id", checkRoleMiddleWare("ADMIN"), userController.delete);

// CONTROL ADMINS
userRouter.post(
  "/register/primary-admin",
  userController.registrationPrimaryAdmin,
);

userRouter.post(
  "/register/admin",
  checkRoleMiddleWare("ADMIN"),
  userController.registrationAdmin,
);

userRouter.get(
  "/admin",
  checkRoleMiddleWare("ADMIN"),
  userController.getAllAdmins,
);

userRouter.get(
  "/auth/admin",
  checkRoleMiddleWare("ADMIN"),
  userController.check,
);

userRouter.delete(
  "/admin/:id",
  checkRoleMiddleWare("ADMIN"),
  userController.deleteAdmin,
);

export default userRouter;
