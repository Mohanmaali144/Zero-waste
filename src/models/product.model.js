import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required : true,
    },
    description: {
        type: String,
        trim: true,
        required : true,
    },
    price: {
        type: Number,
        default : 0,
        required : true,
    },
    quantity: {
        type: Number,
        default : 0,
        required : true,
    },
    weight : {
        type: Number,
        default : 0,
        required : true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    category: {
        type : String,
        ref : "category",
        required : true,
    },
    thumbnail: {
        type: String,
        trim: true,
        required : true,
    },
    brand: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        min : 0,
        max : 5,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    review: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true,
        },
        userReview: {
            type: String,
            trim: true,
             required : true,
        },
        date : {
            type : Date,
            default : Date.now,
        }
    }],
    images: [],
    shippingCost : {
        type : Number,
        default : 0,
    },
    commission : {
        type : Number,
        default : 0,
    },
})

export const product = mongoose.model("product", productSchema);