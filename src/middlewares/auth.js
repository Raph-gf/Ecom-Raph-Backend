import User from "../models/userModel";
import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRETKEY;

const auth = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res.json({ message: "token is required" });
    }
    const token = tokenHeader.split(" ")[1];
    console.log(token);

    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken.user;
    console.log(req.user);

    const user = await User.findOne(req.user);
    console.log(user);
    if (!user) {
      const error = new Error("User not found");
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const userPayload = {
    id: user._id,
    name: user.firstname,
    admin: user.isAdmin,
    cart: user.userCart,
    adresse: user.Adress,
  };
  const token = jwt.sign(userPayload, secretKey, { expiresIn: "3d" });
  return token;
};

export { auth, generateToken };
