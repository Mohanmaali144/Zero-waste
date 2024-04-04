import { validationResult } from "express-validator";
import ScrapProduct from "../models/scrapProduct.model.js";

export const addScrapProduct = async (request, response, next) => {
  try {
    if (!request.body) {
      response.status(401).json({ massage: "Invalid Data" });
    }
    await ScrapProduct.create(request.body);
    response.status(201).json({ massage: "Scrap product Stored Succefully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductList = async (request, response, next) => {
  try {
    let result = await ScrapProduct.find().populate({
      path: "seller",
      select: "-password",
    });
    response.status(200).json({ ScrapProduct: result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (request, response, next) => {
  try {
    const _id = request.params.id;
    let result = await ScrapProduct.findOne({ _id }).populate({
      path: "seller",
      select: "-password",
    });
    if (!result) {
      return response.status(400).json({ massage: "Id not Found" });
    }
    return response.status(200).json({ ScrapProduct: result });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductByName = async (request, response, next) => {
  try {
    const title = request.params.name;
    let result = await ScrapProduct.findOne({ title }).populate({
      path: "seller",
      select: "-password",
    });
    if (!result) {
      return response.status(400).json({ massage: "Product not found" });
    }
    return response.status(200).json({ ScrapProduct: result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductByCategory = async (request, response, next) => {
  try {
    const category = request.params.categoryName;
    let result = await ScrapProduct.find({ category }).populate({
      path: "seller",
      select: "-password",
    });
    if (result.length > 0) {
      return response.status(200).json({ ScrapProduct: result });
    }
    return response.status(400).json({ massage: "Product not found" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProduct = async (request, response, next) => {
  try {
    const { query } = request.body;
    if (!query) {
      return response.status(200).json({ massage: "invalid Searching" });
    }
    const searchCriteria = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { price: { $regex: query, $options: "i" } },
      ],
    };
    let result = await ScrapProduct.find(searchCriteria).populate({
      path: "seller",
      select: "-password",
    });
    if (result.length > 0) {
      return response.status(200).json({ ScrapProduct: result });
    }
    return response.status(400).json({ massage: "Product not found" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProductById = async (request, response, next) => {
  try {
    const id = request.params.id;
    let result = await ScrapProduct.deleteOne({ _id: id });
    if (!result.deletedCount) {
      return response.status(400).json({ massage: "Product id not found" });
    }
    return response.status(200).json({ massage: "Product Deleted Succefully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

// Panding................
// export const updateProductById = async (request, response, next) => {
//   try {
//     const { id, title, description, category, condition, price, thumbnail } =
//       request.body;
//     const updatedProduct = await ScrapProduct.findByIdAndUpdate(
//       { _id: id },
//       {
//         title,
//         description,
//         category,
//         condition,
//         price,
//         thumbnail,
//       }
//     );
//     if (!updatedProduct) {
//       return response.status(404).json({ message: "Product not found" });
//     }
//     return response
//       .status(200)
//       .json({ message: "Product updated successfully" });
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const updateProductById = async (request, response, next) => {
//   try {
//     const { id, title, description, category, condition, price, thumbnail } =
//       request.body;
//       console.log(id)
//     ScrapProduct.updateOne(
//       { _id: id },
//       { $set: { title, description, category, condition, price, thumbnail } }
//     );

//     return response.status(400).json({ massage: "Product not found" });
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({ error: "Internal Server Error" });
//   }
// };
