import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    // quantity: { type: Number },
    // userId: { type: Schema.Types.ObjectId, ref: "user" },
    // active: {
    //   type: Boolean,
    //   default: true,
    // },
    // modifiedOn: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

const Cart = model("cart", cartSchema);
export default Cart;
