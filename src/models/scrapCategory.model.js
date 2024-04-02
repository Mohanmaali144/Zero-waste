import mongoose from "mongoose";

const ScrapCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String, //
    required: true,
  },
});

const ScrapCategory = mongoose.model("ScrapCategory", ScrapCategorySchema);
export default ScrapCategory;
