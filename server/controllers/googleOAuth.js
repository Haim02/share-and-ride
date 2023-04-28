const User = require('../models/user');
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { Strategy } = require('passport-google-oauth20');

module.exports = (passport) => {
        passport.use(new Strategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            passReqToCallback : true ,
            scope: ['profile', 'email'],
          },
          async (request, accessToken, refreshToken, profile, done) => {
            try {
        let user;
             user = await User.findOne({ 'googleId': profile.id });
                // if user exists return the user</em> 
                if (user) {
        // req.user = existingUser
                  return done(null, user);
                }
                // if user does not exist create a new user</em> 
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
             user = await newUser.save({validateBeforeSave: false});
    // req.user=u
                return done(null, user);
            } catch (error) {
                return done(error, false)
            }
          }
        ));
    }