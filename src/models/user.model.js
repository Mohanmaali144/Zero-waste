import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  profile: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["customer", "vendor"],
    required: true,
  },
  location: [
    {
      country: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  ],
});

const User = mongoose.model("user", userSchema);

export default User;
