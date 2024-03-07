import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    price: { type: Number },
    description: { type: String },
  },
  { timestamps: true }
);
const Product = model("Product", productSchema);
export default Product;
