import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  quantity: { type: Number, default: 1 },
  discount: { type: Number, default: 0 },
});

const Product = model("Product", productSchema);
export default Product;
