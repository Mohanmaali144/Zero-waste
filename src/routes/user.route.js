import { register, saveOTP } from "../controllers/user.controller.js";
import { sendOTP, verifyEmail } from "../middlewares/userotp.middleware.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/sendOTP", sendOTP, saveOTP);
userRouter.post("/register", verifyEmail, register);
export default userRouter;
