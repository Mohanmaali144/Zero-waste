import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import OTP from "../models/otp.model.js";
import jwt from "jsonwebtoken";
// User(Customer) otp send
export const saveOTP = async (request, response, next) => {
  try {
    const { email, otpNumber } = request.body;
    const expirationTime = new Date(Date.now() + 1 * 60 * 1000);

    // OTP encryption.
    const hashedOTP = await bcrypt.hash(otpNumber, 12);
    // Save OTP in to Database
    await OTP.create({
      email,
      otp: hashedOTP,
      expirationTime,
    });
    return response.status(200).json({ message: "OTP saved successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// User(Customer) register
export const register = async (request, response, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10);
    request.body.password = hashedPassword;
    const user = await User.create(request.body);
    user.password = undefined;
    return response
      .status(200)
      .json({ massage: "User Registration Successfull", User: user });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// User(Customer) LOGIN
export const signIn = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ message: "Unauthoried user, please chack your email" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(email);
      return response.status(200).json({
        message: "Sign in success...",
        user: { ...user.toObject(), password: undefined },
        token,
      });
    } else {
      return response.status(400).json({
        message: "Unauthorized user, please check your email or password",
      });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: "Internal Server error" });
  }
};

// User(Customer) change password
export const changePassword = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    if (result.matchedCount) {
      return response
        .status(200)
        .json({ message: "Password changed successfully" });
    } else {
      return response
        .status(401)
        .json({ message: "Unauthorized user, please check your email" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

// Token genrate
const generateToken = (email) => {
  let payload = { subject: email };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// ------------------------
