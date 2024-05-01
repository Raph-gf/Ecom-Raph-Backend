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

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EcomDB");
  console.log(`[DATABASE] MongoDB is connected ⚡️`);
}

const app = express();
const port = process.env.PORT;
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./uploads/images"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3456/auth/google",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("Google Profile:", profile);

      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const firstname = profile.name.givenName;
        const lastname = profile.name.familyName;
        const password = "googlePassword";
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
            // picture,
          });
          console.log(googleUser);
          googleUser.password = await googleUser.encryptedPassword(password);
          googleUser.save();

          const token = generateToken(googleUser.id);
          console.log(token);
          console.log(googleUser);
          return cb(null, { googleUser, token });
        } else {
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
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/", (req, res) => {
  res.json("Welcome to the huuudd");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/sign-in",
  })
);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);
app.use("/admin", auth, adminRouter);

app.listen(port, () =>
  console.log(`[SERVER] Listening on http://localhost:${port}`)
);
