import express from "express";
import { param } from "express-validator";

import multer from "multer";
import { addProduct, fetchProductByCategory, fetchProductById, fetchProductByName, fetchProductByPrice, productList, removeProductById, removeProductByName, updateProduct } from "../controllers/product.controller.js";
const productRouter = express.Router();



const upload = multer({ dest: "public/images/" });
// image uplaoding ....
// router.post("/update-profile",upload.single("profile"),updateProfile);


// productRouter.post("/addAllProduct",
//     upload.fields([
//         { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
//         { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
//     ]),
//     addAllProduct);

productRouter.post("/addProduct",
    upload.fields([
        { name: 'thumbnail', maxCount: 1 }, // For single thumbnail upload
        { name: 'images', maxCount: 5 }     // For multiple images (up to 5) upload
    ]),
    addProduct);

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