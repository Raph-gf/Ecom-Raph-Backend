import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  discount: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },
});

const Product = model("product", productSchema);
export default Product;
