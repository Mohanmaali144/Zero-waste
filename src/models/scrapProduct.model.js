import mongoose from "mongoose";

const ScrapProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  category: {
    type: String,
    ref: "ScrapCategory",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  location: [
    {
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },
      fullAddress: {
        type: String,
        required: true,
      },
    },
  ],
  contact: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
});

const ScrapProduct = mongoose.model("ScrapProduct", ScrapProductSchema);

export default ScrapProduct;
