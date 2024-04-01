import {
  register,
  saveOTP,
  signIn,
  updatePassword,
} from "../controllers/user.controller.js";
import {
  forgetPasswordOTP,
  sendOTP,
  verifyEmail,
} from "../middlewares/userotp.middleware.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/sendOTP", sendOTP, saveOTP);

userRouter.post("/register", verifyEmail, register);

userRouter.post("/signIn", signIn);
userRouter.post("/forget-password", forgetPasswordOTP, saveOTP);
userRouter.post("/verify-otp", verifyEmail, updatePassword);

export default userRouter;
