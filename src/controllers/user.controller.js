import sendMail from "../utils/SendMail.js";
import User from "../models/user.model.js";
import { PROJECT_NAME } from "../constants.js";
import bcrypt from "bcrypt";
// import { validationResult } from "express-validator";
import { getEmailOTPMassage, generateOTP } from "../utils/generateMassage.js";
import OTP from "../models/otp.model.js";

// User(Customer) otp send
export const saveOTP = async (request, response, next) => {
  try {
    let { email } = request.body;
    const expirationTime = new Date(Date.now() + 1 * 60 * 1000);
    let otpNumber = request.body.otpNumber;
    console.log(otpNumber);
    await OTP.create({ email, otp: otpNumber, expirationTime })
      .then((otpresult) => {
        return response.status(200).json({ massage: "otp save succesfully" });
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({ error: "OTP " });
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal server error " });
  }
};

// User(Customer) register

export const register = async (request, response, next) => {
  try {
    let password = request.body.password;
    // password encryption.
    let saltkey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, saltkey);
    request.body.password = password;
    // save user data
    User.create(request.body)
      .then((result) => {
        // result = result.toObject();
        delete result.password;
        return response
          .status(200)
          .json({ massage: "User registartion succesfully", User: result });
      })
      .catch((error) => {
        console.log(error);
        return response.status(500).json({ error: "User registration faild" });
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "internal server error" });
  }
};

// ------------------------

// User(Customer) otp send
// export const saveOTP = async (request, response, next) => {
//   try {
//     let { email } = request.body;
//     const expirationTime = new Date(Date.now() + 1 * 60 * 1000);
//     let otpNumber = request.body.otpNumber;
//     console.log(otpNumber);
//     await OTP.create({ email, otp: otpNumber, expirationTime })
//       .then((otpresult) => {
//         let password = request.body.password;
//         // password encryption.
//         let saltkey = bcrypt.genSaltSync(10);
//         password = bcrypt.hashSync(password, saltkey);
//         request.body.password = password;
//         // save user data
//         User.create(request.body)
//           .then((result) => {
//             // result = result.toObject();
//             delete result.password;
//             return response
//               .status(200)
//               .json({ massage: "User registartion succesfully", User: result });
//           })
//           .catch((error) => {
//             console.log(error);
//             return response
//               .status(500)
//               .json({ error: "User registration faild" });
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//         return response.status(500).json({ error: "internal server error" });
//       });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({ error: "Internal server error " });
//   }
// };
