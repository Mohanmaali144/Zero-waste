import express from "express";
import { body, param } from "express-validator";

import { addAllProduct, fetchProductByCategory, fetchProductById, fetchProductByName, fetchProductByPrice, productList, removeProductById, removeProductByName, updateProduct, addProduct} from "../controllers/product.controller.js";

const router = express.Router();
router.post("/addAllProduct",
    body("productName", "product name is required").notEmpty(),
    body("description", "description is required").notEmpty(),
    body("price", "price is required").notEmpty(),
    body("price", "only digit allowed").isNumeric(),
    body("quantity", "qunatity is required").notEmpty(),
    body("quantity", "only digit allowed").isNumeric(),
    body("weight", "only digit allowed").isNumeric(),
    body("sellerId", "seller id is required").notEmpty(),
    body("category", "category is required").notEmpty(),
    body("thumbnail", "thumbnail is required").notEmpty(),
    body("rating", "only digit allowed").isNumeric(),
    body("discountPercentage", "only digit allowed").isNumeric(),
    body("userId", "user id required").notEmpty(),
    body("userReview", "user review is required").notEmpty(),
    body("images", "images is required").notEmpty(),
    body("shippingCost", "shipping Cost is required").isNumeric(),
    body("commission", "commission is required").isNumeric(),
    addAllProduct);

router.post("/addProduct",
    body("productName", "product name is required").notEmpty(),
    body("description", "description is required").notEmpty(),
    body("price", "price is required").notEmpty(),
    body("price", "only digit allowed").isNumeric(),
    body("quantity", "qunatity is required").notEmpty(),
    body("quantity", "only digit allowed").isNumeric(),
    body("weight", "only digit allowed").isNumeric(),
    body("sellerId", "seller id is required").notEmpty(),
    body("category", "category is required").notEmpty(),
    body("thumbnail", "thumbnail is required").notEmpty(),
    body("rating", "only digit allowed").isNumeric(),
    body("discountPercentage", "only digit allowed").isNumeric(),
    body("userId", "user id required").notEmpty(),
    body("userReview", "user review is required").notEmpty(),
    body("images", "images is required").notEmpty(),
    body("shippingCost", "shipping Cost is required").isNumeric(),
    body("commission", "commission is required").isNumeric(),
    addProduct);

router.get("/productList", productList);

router.get("/fetchProductById/:id",
    param("id", "product id is required").notEmpty(),
    fetchProductById);

router.get("/fetchProductByName/:name",
    param("name", "product name is required").notEmpty(),
    fetchProductByName);

router.get("/fetchProductByCategory/:category",
    param("category", "product category is required").notEmpty(),
    fetchProductByCategory);

router.get("/fetchProductByPrice/:price",
    param("price", "product price is required").notEmpty(),
    fetchProductByPrice);

router.delete("/removeProductById/:id",
    param("id", "product id is required").notEmpty(),
    removeProductById);

router.delete("/removeProductByName/:name",
    param("name", "product name is required").notEmpty(),
    removeProductByName);

router.put("/updateProduct", updateProduct);

// router.get("/searchProduct",searchProduct);
// router.delete("/removeImage",removeImage);
// router.put("/updateImage",updateImage);
// router.post("/addImage",addImage);

export default router;