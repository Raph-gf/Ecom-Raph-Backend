import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    zipCode: {
      type: Number,
      min: [1000, "Code Postal is too short"],
      max: 99999,
      required: true,
    },
    Adress: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export default User;
