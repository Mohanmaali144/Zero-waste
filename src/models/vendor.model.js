import mongoose from "mongoose";

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  gstNumber: { type: String, required: true },
  address: [
    {
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
      landmark: { type: String },
      fullAddress: { type: String, required: true },
    },
  ],
  rating: { type: Number, min: 0, max: 5 },
  isVerify: { type: Boolean, default: false },
});

const Vendor = mongoose.model("vendor", vendorSchema);

export default Vendor;
