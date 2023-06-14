// const User = require("../models/user");
// // // const GoogleStrategy = require("passport-google-oauth2").Strategy;
// // const { Strategy } = require("passport-google-oauth20");

// // module.exports = (passport) => {
// //     passport.use(
// //         new Strategy(
// //             {
// //                 clientID: process.env.CLIENT_ID,
// //                 clientSecret: process.env.CLIENT_SECRET,
// //                 callbackURL: "http://localhost:3001/api/auth/google/callback",
// //                 passReqToCallback: true,
// //                 proxy: true,
// //                 scope: ["profile", "email"],
// //             },
// //             async (request, accessToken, refreshToken, profile, done) => {
// //         try {
// //             let user;
// //             user = await User.findOne({ googleId: profile.id }); 
// //             if (user) {
// //             return done(null, user); 
// //           } 
// //           const newUser = new User({
// //             googleId: profile.id,
// //             name: profile.displayName,
// //             email: profile.emails[0].value,
// //             phone: profile.phone[0].value
// //           });
// //           user = await newUser.save({ validateBeforeSave: false });
// //           return done(null, user);
// //         } catch (error) {
// //           return done(error, false);
// //         }
// //       }
// //     )
// //   );

// //   passport.serializeUser((user, done) =>{
// //     console.log('serializeUser',user)
// //  done(null, user.id)
// // })
// // passport.deserializeUser(async (userId, done) => { 
// //     try {
// //         const user = await User.findById(userId);
// //         done(null, user)
// //     } catch (error) {
// //         done(error)
// //     }
// // })
// // };

// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// })

// passport.deserializeUser((user, done) => {
//     done(null, user);
// })

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3001/api/auth/google/google/callback",
//     scope: ["profile", "email"],
//     passReqToCallback: true,
//   },
//   async function(accessToken, refreshToken, profile, done) {
//     try { 
//                     let user;
//                     user = await User.findOne({ googleId: profile.id }); 
//                     if (user) {
//                     return done(null, user); 
//                   } 
//                   const newUser = new User({
//                     googleId: profile.id,
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     phone: profile.phone[0].value
//                   });
//                   user = await newUser.save({ validateBeforeSave: false });
//                   done(null, user)
//                   return done(null, user);
//                 } catch (error) {
//                   return done(error, false);
//                 }
//   }
// ));
