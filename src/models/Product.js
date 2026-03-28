import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    fechaCreacion: { type: Date, default: Date.now },
    fechaUltimoIngreso: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
