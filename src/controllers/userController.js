import User from "../models/userModel";
import "dotenv/config";

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

const signIn = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await User.create(req.body);
    newUser.password = await newUser.encryptedPassword(req.body.password);
    newUser.save();
    const createToken = jwt.sign({ id: newUser.id }, secretKey, {
      expiresIn: "1d",
    });
    res.json({ newUser, createToken });
  } catch (error) {
    res.json({ error: error.message });
    console.log({ error: error.message });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Email invalide");
      throw error;
    }
    const verifiedPassword = await user.validPassword(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      const error = new Error("Invalid password");
      throw error;
    }
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1d",
    });
    res.json({ user, token, message: "Connexion réussi" });
  } catch (error) {
    res.json({ error: error.message });
  }
};
export { signIn, login };
