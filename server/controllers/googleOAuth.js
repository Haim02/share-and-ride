const User = require("../models/user");
const dotenv = require("dotenv");
const { Strategy } = require("passport-google-oauth20");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

dotenv.config({ path: "./config.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user;
        user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          phone: profile?.phone[0]?.value || null,
        });
        user = await newUser.save({ validateBeforeSave: false });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
