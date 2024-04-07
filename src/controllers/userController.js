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
      const error = new Error("Invalid email");
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
    res.json({ user, token, message: "Login successful" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    console.log(user);
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.password = await user.encryptedPassword(req.body.password);
    user.save();
    const createToken = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: "1d",
    });
    res.json({ user, createToken });
  } catch (error) {
    res.json({ error: error.message });
    console.log({ error: error.message });
  }
};

export {
  signIn,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
};
