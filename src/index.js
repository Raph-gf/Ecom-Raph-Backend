import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import productRouter from "./routes/productsRoute";
import userRouter from "./routes/userRoute";
import paymentRouter from "./routes/paymentRoute";
import adminRouter from "./routes/adminRoute";
import { auth, generateToken } from "./middlewares/auth";
import passport from "passport";
import session from "express-session";
import User from "./models/userModel";
import axios from "axios";
import cookieParser from "cookie-parser";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EcomDB");
  console.log(`[DATABASE] MongoDB is connected ⚡️`);
}

const app = express();
const port = process.env.PORT;
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const upload = multer({ dest: "uploads/" });

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./uploads/images"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3456/auth/google/callback",
      scope: ["email", "profile"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // console.log({ profile: profile });
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const firstname = profile.name.givenName;
        const lastname = profile.name.familyName;
        const password = "azerty";
        const zipCode = 10000;
        const Adress = "Adresse par défaut";
        const role = "user";
        const userCart = [];
        let googleUser = await User.findOne({ email });

        if (!googleUser) {
          googleUser = await User.create({
            googleId,
            email,
            firstname,
            lastname,
            password,
            zipCode,
            Adress,
            role,
            userCart,
          });
          googleUser.password = await googleUser.encryptedPassword(password);
          googleUser.save();
          const token = generateToken(googleUser.id);
          console.log("user successfully sign");
          return cb(null, { googleUser, token });
        } else {
          const token = generateToken(googleUser.id);
          console.log("user successfully logged in");
          googleUser.token = token;
          return cb(null, googleUser, token);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(async function (user, done) {
  const googleuser = await User.findById(user.id);
  done(null, googleuser);
});

app.get("/", (req, res) => {
  res.json("Welcome to the huuudd");
});

app.get(
  "/auth/google/login",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/sign-in",
    // successRedirect: "http://localhost:5173/",
  }),
  (req, res) => {
    const user = req.user;
    console.log(user);
    const token = generateToken(user._id);
    res.cookie("jwtToken", token, { httpOnly: true, secure: false });
    res.status(200).json({ user: user, token: token });
    // res.redirect("http://localhost:3456/login/success");
  }
);
app.get("/login/success", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    console.log("blanla");
    try {
      const user = await User.findOne({ email: req.user.email });
      console.log(user);
      console.log("salut");

      if (user) {
        const token = generateToken(user._id);
        return res.status(200).json({
          user: req.user,
          message: "Successfully logged in",
          token: token,
        });
      } else {
        const googleId = req.user.id;
        const email = req.user.emails[0].value;
        const firstname = req.user.name.givenName;
        const lastname = req.user.name.familyName;
        const password = "azerty";
        const zipCode = 10000;
        const address = "Adresse par défaut";
        const role = "user";
        const userCart = [];

        const newUser = new User({
          googleId,
          email,
          firstname,
          lastname,
          password,
          zipCode,
          address,
          role,
          userCart,
        });

        await newUser.save();

        const token = generateToken(newUser._id);
        return res.status(200).json({
          user: req.user,
          message: "Successfully logged in",
          token: token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  } else {
    return res.status(403).json({
      message: "Not Authorized",
    });
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);
app.use("/admin", auth, adminRouter);

app.listen(port, () =>
  console.log(`[SERVER] Listening on http://localhost:${port}`)
);
