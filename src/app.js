import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route.js";
import scrapCategoryRouter from "./routes/scrapCategory.route.js";
import scrapProductRouter from "./routes/scrapProduct.route.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import NotificationRouter from "./routes/notification.route.js";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// read about cors in documentations
app.use(
  express.json({
    limit: "20kb",
  })
);
//  object inside the object your send throght postman
app.use(
  express.urlencoded({
    extended: true,
    // limit: "16kb",
  })
);
// publix asset like images like logo svg fevicon
app.use(express.static("public"));

// rotes declartions
app.use("/api/user", userRouter);

// Scrap category Base router
app.use("/api/scrapCategory", scrapCategoryRouter);
app.use("/api/scrapProduct", scrapProductRouter);

// user Product Base Router
app.use("/api/product", productRouter);
app.use("/api/category",categoryRouter);

// Notification route
app.use("/api/notification",NotificationRouter);

export default app;
