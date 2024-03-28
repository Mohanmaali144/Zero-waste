import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/doConfig.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MognoDB Fail to connect !!!", err);
  });

