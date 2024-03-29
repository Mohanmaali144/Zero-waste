// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

const sendMail = async (req, res,next) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    service:'Gmail',
    auth: {
      user: "marlene.rosenbaum24@ethereal.email",
      pass: "2DYpt151BWeqTeEg8A",
    },
  });

  let info = await transporter.sendMail({
    from: 'mohanmaali143@gmail.com',
    to: "nitinmalviya172@gmail.com",
    subject: 'Email Verification',
    text:  "hello wolrd",
    // text: `Click the following link to verify your email: http://your-website.com/verify-email/${verificationToken}`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log(info)
//   res.json(info);
};

sendMail();
export default sendMail;
