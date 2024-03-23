import cors from "cors";
import express from "express";

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
    limit: "16kb",
  })
);

// publix asset like images like logo svg fevicon

app.use(express.static("public"));


// cookies parser you send and access cookies to user this send by serve 

// import router 
// rotes declartions



export default app;
