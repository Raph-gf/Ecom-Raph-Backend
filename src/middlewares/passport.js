const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
import passport from "passport";

export const AuthWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5173/",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
        console.log(profile);
      }
    )
  );
  passport.serializeUser(function (err, user) {
    return done(null, user);
  });
  passport.deserializeUser(function (err, user) {
    return done(null, user);
  });
};
