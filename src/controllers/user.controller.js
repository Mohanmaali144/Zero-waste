import sendMail from "../utils/SendMail";

export const signUp = async (req, res, next) => {
  try {
    sendMail();
  } catch (error) {
    console.log(error);
  }
};
