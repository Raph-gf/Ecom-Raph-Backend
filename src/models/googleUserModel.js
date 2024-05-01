import { Schema, model } from "mongoose";

const googleUserSchema = new Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);
const GoogleUser = model("GoogleUser", googleUserSchema);
export default GoogleUser;
