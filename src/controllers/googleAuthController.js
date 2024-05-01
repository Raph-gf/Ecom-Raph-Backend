// import passport from "passport";
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// import { generateToken } from "../middlewares/auth";
// import User from "../models/userModel";

// export const handleGoogleLoginCallback = passport.authenticate("google", {
//   successRedirect: "http://localhost:5173/",
//   failureRedirect: "http://localhost:5173/sign-in",
// });

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3456/auth/google/callback",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       console.log("Google Profile:", profile);

//       try {
//         const googleId = profile.id;
//         const email = profile.emails[0].value;
//         const firstname = profile.name.givenName;
//         const lastname = profile.name.familyName;
//         const password = "googlePassword";
//         const zipCode = 10000;
//         const Adress = "Adresse par défaut";
//         const role = "user";
//         const userCart = [];

//         let googleUser = await User.findOne({ email });

//         if (!googleUser) {
//           googleUser = await User.create({
//             googleId,
//             email,
//             firstname,
//             lastname,
//             password,
//             zipCode,
//             Adress,
//             role,
//             userCart,
//           });
//           console.log(googleUser);
//           googleUser.password = await googleUser.encryptedPassword(password);
//           googleUser.save();
//         } else {
//           googleUser.firstname = firstname;
//           googleUser.lastname = lastname;
//           await googleUser.save();
//           console.log(googleUser);
//         }
//         const token = generateToken(googleUser.id);
//         console.log(token);
//         return cb(null, { googleUser, token });
//       } catch (error) {
//         return cb(error);
//       }
//     }
//   )
// );
