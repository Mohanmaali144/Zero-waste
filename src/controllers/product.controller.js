import { validationResult } from "express-validator";
import { PRODUCT_ARRIVAL_MSG } from "../constants.js";
import Notification from "../models/notification.model.js";
import { product } from "../models/product.model.js";
import User from "../models/user.model.js";


export const addAllProduct = async (request, response, next) => {
    try {
        let data = request.body.products;
        const errors = await validationResult(data);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        await product.insertMany(data)
            .then(result => {
                return response.status(200).json({ message: "product data successfully added", result });
            }).catch(err => {
                console.log(err);
                return response.status(500).json({ error: "Internal server error" });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}
//-----
export const addProduct = async (request, response, next) => {
    try {
        const errors = await validationResult(request.body);
        if (!errors.isEmpty()) {
            return response.status(401).json({ errors: errors.array() });
        }
       const productobj =  await product.create(request.body);
         // Send a notification to all users about the new product
        const users = await User.find({});
         const notificationPromises = users.map(user =>
           Notification.create({
           userId: user._id,
          message: `${PRODUCT_ARRIVAL_MSG}  ${productobj.productName}`
      })
    );
    await Promise.all(notificationPromises);
    return response.status(200).json({ message: "product data Stored Successfully" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal server error" });
    }
}
//----------
export const productList = (request, response, next) => {
    product.find().populate({
        path: "sellerId",
        select: "-password",
      }).populate({
        path: "review.userId",
        select: "-password",
      })
        .then(result => {
            return response.status(200).json({ products: result });
        }).catch(err => {
            return response.status(500).json({ error: "product are not available" });
        })
}
//-----
export const fetchProductById = async (request, response, next) => {
    try {
        let id = request.params.id;
        const errors = await validationResult(id);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        await product.find({ _id: id }).populate({
            path: "sellerId",
            select: "-password",
          }).populate({
            path: "review.userId",
            select: "-password",
          })
            .then(result => {
                return response.status(200).json({ product: result });
            })
            .catch(err => {
                return response.status(500).json({ error: "product are not available" });
            })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//--------
export const fetchProductByName = async (request, response, next) => {
    try {
        let name = request.params.name;
        const errors = await validationResult(name);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        await product.find({ productName: name }).populate({
            path: "sellerId",
            select: "-password",
          }).populate({
            path: "review.userId",
            select: "-password",
          })
            .then(result => {
                return response.status(200).json({ product: result });
            })
            .catch(err => {
                return response.status(500).json({ error: "product are not available" });
            })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//--------
export const fetchProductByCategory = async (request, response, next) => {
    try {
        let category = request.params.category;
        const errors = await validationResult(category);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        await product.find({ category: category }).populate({
            path: "sellerId",
            select: "-password",
          }).populate({
            path: "review.userId",
            select: "-password",
          })
            .then(result => {
                return response.status(200).json({ product: result });
            })
            .catch(err => {
                return response.status(500).json({ error: "product are not available" });
            })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//--------
export const fetchProductByPrice = async (request, response, next) => {
    try {
        let price = request.params.price;
        const errors = await validationResult(price);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        await product.find({ price: price }).populate({
            path: "sellerId",
            select: "-password",
          }).populate({
            path: "review.userId",
            select: "-password",
          })
            .then(result => {
                return response.status(200).json({ product: result });
            })
            .catch(err => {
                return response.status(500).json({ error: "product are not available" });
            })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//--------
export const removeProductById = async (request, response, next) => {
    try {
        let id = request.params.id;
        const errors = await validationResult(id);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        let Product = await product.findOne({ _id: id });
        if (Product) {
            await product.deleteOne({ _id: id });
            return response.status(200).json({ message: "product deleted successfully" });
        }
        return response.status(401).json({ error: "Bad request (id not found)" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//--------
export const removeProductByName = async (request, response, next) => {
    try {
        let name = request.params.name;
        const errors = await validationResult(name);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        let Product = await product.findOne({productName:name});
        if (Product) {
            await product.deleteMany({productName:name});
            return response.status(200).json({ message: "product deleted successfully" });
        }
        return response.status(401).json({ error: "Bad request (id not found)" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
//-----
export const updateProduct = async (request, response, next) => {
    try {
        let { id, productName, description, price, quantity, weight, sellerId, discountPercentage, rating, brand, category, thumbnail, userId, userReview, date, shippingCost, commission } = request.body;

        let Product = await product.findOne({ _id: id });
        if (Product) {
            await product.updateMany({ _id: id }, { productName, description, price, quantity, weight, sellerId, discountPercentage, rating, brand, thumbnail, review: [{ userId, userReview, date }], category, shippingCost, commission });

            return response.status(200).json({ message: "product data successully updated" })
        }
        return response.status(401).json({ error: "Bad request {product id not fonund}" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

//------
// export const removeImage = (request, response, next) => {
//     let sellerId = request.body.sellerId;
//     let image = request.body.image;
//     product.findOneAndUpdate(
//         { sellerId },
//         { $pull: { images: image } },
//         { new: true })
//         .then(result => {
//             if (!result) {
//                 return response.status(404).json({ error: "Product not found" });
//             }
//             return response.status(200).json({ data: result });
//         })
//         .catch(err => {
//             console.log(err);
//             return response.status(500).json({ error: "Internal server error" });
//         });
// };
//-------
// export const updateImage = (request, response, next) => {
//     let sellerId = request.body.sellerId;
//     let image = request.body.image;

//     product.findOneAndUpdate(
//         { sellerId },
//         { $pull: { images: image } },
//         { new: true }
//     )
//         .then(result => {
//             if (!result) {
//                 return response.status(404).json({ error: "Product not found" });
//             }
//             let newImage = request.body.newImage;
//             return product.findOneAndUpdate(
//                 { sellerId },
//                 { $push: { images: newImage } },
//                 { new: true }
//             );
//         })
//         .then(updatedProduct => {
//             return response.status(200).json({ data: updatedProduct });
//         })
//         .catch(err => {
//             console.log(err);
//             return response.status(500).json({ error: "Internal server error" });
//         });
// };
//------