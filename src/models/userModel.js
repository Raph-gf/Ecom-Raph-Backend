import {
  Schema,
  SchemaType,
  SchemaTypeOptions,
  SchemaTypes,
  model,
} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: [6, "at least 6 characters"],
    },
    zipCode: {
      type: Number,
      min: [1000, "Code Postal is too short"],
      max: 99999,
      required: true,
    },
    Adress: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    userCart: [{ type: Schema.Types.ObjectId, ref: "cart" }],
    profilePicture: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.encryptedPassword = async (password) => {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

userSchema.methods.validPassword = async (candidatePassword, oldPassword) => {
  const result = await bcrypt.compare(candidatePassword, oldPassword);
  return result;
};

const User = model("User", userSchema);
export default User;
