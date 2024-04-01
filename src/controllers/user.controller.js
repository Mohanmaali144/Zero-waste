import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import OTP from "../models/otp.model.js";
import jwt from "jsonwebtoken";
import { response } from "express";
import Vendor from "../models/vendor.model.js";

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
        return response.status(500).json({ error: "OTP Failed to save" });
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
        if (request.body.role === "vendor") {
          const { city, pincode, state, landmark, fullAddress } = request.body;
          // Save Vendor Details
          const vendor = Vendor.create({
            userId: result._id,
            gstNumber: request.body.gstNumber,
            address: [{ city, pincode, state, landmark, fullAddress }],
          });
          return response.status(200).json({
            massage: "Vendor registartion succesfully,,  wait for verification",
            User: result,
          });
        }
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

// User(Customer) LOGIN
export const signIn = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    // chack user
    const user = await User.findOne({ email });
    if (user) {
      let password = req.body.password;
      // check password
      if (bcrypt.compareSync(password, user.password)) {
        return res.status(200).json({
          message: "Sign in success...",
          user: { ...user.toObject(), password: undefined },
          token: generateToken(email),
        });
      } else {
        return res.status(500).json({ message: "Incorrect password..." });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized user,,, please Check your email" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Internal server error" });
  }
};

// User(Customer) change password
export const updatePassword = async (request, response, next) => {
  try {
    let { email, password } = request.body;
    // password encryption.
    let saltkey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, saltkey);
    // request.body.password = password;
    const result = await User.updateOne({ email }, { $set: { password } });
    if (result.matchedCount) {
      return response
        .status(401)
        .json({ message: "Paasword change Succesfully" });
    }
    return response
      .status(401)
      .json({ message: "Unauthorized user,,, please Check your email" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Internal server error" });
  }
};

// Token genrate
const generateToken = (email) => {
  let payload = { subject: email };
  return jwt.sign(payload, process.env.JWT_SECRET);
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
