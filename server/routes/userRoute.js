import express from "express";
import { isAuth, login, register } from "../controllers/userController.js";
import { authUser, logout } from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/is-auth", authUser, isAuth);
userRouter.post("/logout", authUser, logout);

export default userRouter;