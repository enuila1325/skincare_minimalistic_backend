import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
  {
    image: {
      type: String,
      required: true,
      trim: true,
    }
  }
);

export default mongoose.model("Category", categorySchema);