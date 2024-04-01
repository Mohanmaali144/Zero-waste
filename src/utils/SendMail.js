import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (recipientEmail, emailSubject, emailMessage) => {
  try {
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to: recipientEmail,
      subject: emailSubject,
      text: emailMessage,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        console.log("Email sent successfully: " + info);
        return true;
      } else throw new Error("Failed to send email");
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
};
// sendMail("mehrapoonam379@gmail.com");

export default sendMail;
