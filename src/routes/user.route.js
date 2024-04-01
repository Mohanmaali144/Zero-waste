import express from "express";
import { body } from "express-validator";
import {
  register,
  saveOTP,
  signIn,
  changePassword,
} from "../controllers/user.controller.js";
import {
  forgetPasswordOTP,
  sendOTP,
  verifyEmail,
} from "../middlewares/userotp.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/sendOTP",
  body("email", "email is required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  body("username", "username is required").notEmpty(),
  sendOTP,
  saveOTP
);

userRouter.post(
  "/register",
  body("email", "Email required").notEmpty(),
  body("email", "invalid email").isEmail(),
  body("username", "Username required").notEmpty(),
  body("username", "Username required").notEmpty(),
  body("username", "Username must be at least 3 characters long").isLength({
    min: 3,
  }),
  body("username", "Username cannot be more than 20 characters long").isLength({
    max: 20,
  }),
  body("contact", "contact number required").notEmpty(),
  body("contact", "Invalid Contact Number").isNumeric(),
  body("password", "Password required").notEmpty(),
  // body("password", "pleas Enter Strong password").isStrongPassword(),
  body("password", "pleas Enter Strong password").isLength({ min: 6 }),

  verifyEmail,
  register
);

userRouter.post(
  "/signIn",
  body("email", "Email required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  body("password", "Password required").notEmpty(),
  signIn
);
userRouter.post(
  "/forget-password",
  body("email", "Email required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  forgetPasswordOTP,
  saveOTP
);

userRouter.post(
  "/verify-otp",
  body("email", "email required").notEmpty(),
  body("otp", "Otp required").notEmpty(),
  verifyEmail
);

userRouter.post(
  "/change-password",
  body("email", "email required").notEmpty(),
  body("email", "email is not valid").isEmail(),
  body("password", "Password required").notEmpty(),
  // body("password", "pleas Enter Strong password").isStrongPassword(),
  body("password", "pleas Enter Strong password").isLength({ min: 6 }),

  changePassword
);

export default userRouter;
