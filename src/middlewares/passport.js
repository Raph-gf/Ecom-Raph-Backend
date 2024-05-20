import User from "../models/userModel";
import "dotenv/config";
import { generateToken } from "./middlewares/auth";
import passport from "passport";
import session from "express-session";

const passport = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3456/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("Google Profile:", profile);

      try {
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
            // picture,
          });
          console.log(googleUser);
          googleUser.password = await googleUser.encryptedPassword(password);
          googleUser.save();
          const token = generateToken(googleUser.id);

          // console.log(token);
          // console.log(googleUser);
          console.log("user successfully sign");
          return cb(null, { googleUser, token });
        } else {
          const token = generateToken(googleUser.id);
          console.log(token);
          // console.log(googleUser);
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
passport.deserializeUser(function (user, done) {
  done(null, user);
});
