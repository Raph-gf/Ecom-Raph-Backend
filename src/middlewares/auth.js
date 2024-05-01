import User from "../models/userModel";
import "dotenv/config";
import jwt from "jsonwebtoken";
import passport from "passport";

const secretKey = process.env.JWT_SECRETKEY;
// const GoogleStrategy = require("passport-google-oauth20").OAuth2Strategy;

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
    role: user.role,
    cart: user.userCart,
    adresse: user.Adress,
  };
  const token = jwt.sign(userPayload, secretKey, { expiresIn: "3d" });
  return token;
};

// const AuthWithGoogle = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:3456/",
//       },
//       function (accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//           return cb(err, user);
//         });
//       }
//     )
//   );
//   passport.serializeUser(function (err, user) {
//     return done(err, user);
//   });
//   passport.deserializeUser(function (err, user) {
//     return done(err, user);
//   });
// };

export { auth, generateToken };
