import { SignUp, signUp } from "../controllers/user.controller.js";
import { express } from "express";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
