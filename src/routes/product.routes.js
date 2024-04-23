import express from "express";
import { body, param } from "express-validator";
import { upload } from "../middlewares/multer.middleware.js";

import { addAllProduct, fetchProductByCategory, fetchProductById, fetchProductByName, fetchProductByPrice, productList, removeProductById, removeProductByName, updateProduct, addProduct } from "../controllers/product.controller.js";

import { param } from "express-validator";

import multer from "multer";
import { addProduct, fetchProductByCategory, fetchProductById, fetchProductByName, fetchProductByPrice, productList, removeProductById, removeProductByName, updateProduct } from "../controllers/product.controller.js";
const productRouter = express.Router();


productRouter.post("/addProduct", 
upload.fields([
    { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
    { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
]),
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
addProduct
);

// image uplaoding ....
// router.post("/update-profile",upload.single("profile"),updateProfile);


// productRouter.post("/addAllProduct",
//     upload.fields([
//         { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
//         { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
//     ]),
//     addAllProduct);

productRouter.get("/productList", productList);

productRouter.get("/fetchProductById/:id",
    param("id", "product id is required").notEmpty(),
    fetchProductById);

productRouter.get("/fetchProductByName/:name",
    param("name", "product name is required").notEmpty(),
    fetchProductByName);

productRouter.get("/fetchProductByCategory/:category",
    param("category", "product category is required").notEmpty(),
    fetchProductByCategory);

productRouter.get("/fetchProductByPrice/:price",
    param("price", "product price is required").notEmpty(),
    fetchProductByPrice);

productRouter.delete("/removeProductById/:id",
    param("id", "product id is required").notEmpty(),
    removeProductById);

productRouter.delete("/removeProductByName/:name",
    param("name", "product name is required").notEmpty(),
    removeProductByName);

productRouter.put("/updateProduct", updateProduct);

// router.get("/searchProduct",searchProduct);
// router.delete("/removeImage",removeImage);
// router.put("/updateImage",updateImage);
// router.post("/addImage",addImage);

export default productRouter;