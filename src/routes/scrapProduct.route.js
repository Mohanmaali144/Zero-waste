import express from "express";
import { body, param } from "express-validator";
import {
  addScrapProduct,
  deleteProductById,
  getProductByCategory,
  getProductById,
  getProductByName,
  getProductList,
  searchProduct,
  updateProductById,
} from "../controllers/scrapProduct.controller.js";
import { auth } from "../middlewares/authorize.js";
const scrapProductRouter = express.Router();

scrapProductRouter.post("/addProduct",auth, addScrapProduct);
scrapProductRouter.get("/getProductList", getProductList);
scrapProductRouter.get("/getProduct-byid/:id", getProductById);
scrapProductRouter.get("/getProduct-byname/:name", getProductByName);
scrapProductRouter.get(
  "/getProduct-bycategory/:categoryName",
  getProductByCategory
);
scrapProductRouter.get("/search-product", searchProduct);

scrapProductRouter.delete("/deleteproduct-byid/:id", deleteProductById);

scrapProductRouter.put("/updateproduct-byid", updateProductById);

export default scrapProductRouter;