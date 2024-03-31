import sendMail from "../utils/SendMail.js";
import {
  getEmailOTPMassage,
  generateOTP,
  getForgetPasswordmassage,
} from "../utils/generateMassage.js";
import { PROJECT_NAME } from "../constants.js";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";

const sendOTP = async (request, response, next) => {
  try {
    const { email, username } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(201).json({ msg: "User already exist" });
    }
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      if (existingOTP.expirationTime.getTime() > Date.now()) {
        const remainingTime = Math.ceil(
          (existingOTP.expirationTime.getTime() - Date.now()) / 1000
        );
        return response.status(400).json({
          message: `Please wait for ${remainingTime} seconds before requesting a new OTP`,
        });
      } else {
        await OTP.deleteOne({ email });
      }
    }
    const otpNumber = generateOTP();
    sendMail(
      email,
      `Subject: Your One-Time Password (OTP) for ${PROJECT_NAME}`,
      getEmailOTPMassage(username, otpNumber)
    );
    request.body.otpNumber = otpNumber;
    // send on next controller
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "internal server error" });
  }
};

const forgetPasswordOTP = async (request, response, next) => {
  try {
    const { email } = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response
        .status(201)
        .json({ msg: "you are not Registerd .. Please SignUp " });
    }
    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) {
      if (existingOTP.expirationTime.getTime() > Date.now()) {
        const remainingTime = Math.ceil(
          (existingOTP.expirationTime.getTime() - Date.now()) / 1000
        );
        return response.status(400).json({
          message: `Please wait for ${remainingTime} seconds before requesting a new OTP`,
        });
      } else {
        await OTP.deleteOne({ email });
      }
    }
    const otpNumber = generateOTP();
    sendMail(
      email,
      `Subject: Password Reset OTP For ${PROJECT_NAME}`,
      getForgetPasswordmassage(otpNumber)
    );
    request.body.otpNumber = otpNumber;
    // send on next controller
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "internal server error" });
  }
};

const verifyEmail = async (request, response, next) => {
  try {
    const { email, otp } = request.body;
    console.log(request.body);
    let otpData = await OTP.findOne({ email });
    console.log(otp);
    if (otp === otpData.otp) {
      await OTP.deleteOne({ email });
      next();
    } else {
      return response
        .status(400)
        .json({ massage: "invalid Otp !!! make sure You write correct otp" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "internal server error" });
  }
};

export { sendOTP, verifyEmail, forgetPasswordOTP };
