// const passport = require('passport');
// const { Strategy } = require('passport-google-oauth20');
// const User = require('../models/user');

// passport.use(new Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3001/auth/google/callback',
//     passReqToCallback: true,
//    },
//    async (accessToken, refreshToken, profile, done) => {
//     const defaultUser = {
//         name: profile.name,
//         email: profile.emails[0].value,
//         googleId: profile.id
//     }

//     const user = await User.findOrCreate({ googleId: profile.id},
//         function (err, user) {
//             console.log(err)
//             return cb(err, user);
//           })

//           if (user && user[0]){
//             return cb(null, user)
//           }
//         }))

// passport.serializeUser((user, cb) => {
//     console.log('serialize User: ' , user)
//     cb(null, user.id)
// });

// passport.deserializeUser(async (id, cb) => {
//     const user = await User.findOne({id})
//     .catch((err) => {
//         console.log('deserializeUser err: ', err)
//         cb(err,null)
//     });

//     console.log('seSerialized user ', user)

//     if(user) cb(null, user)
// })



// // const loginWithGoogle = () => {
// //     return passport.authenticate('google', {
// //         scope: ['email', 'profile']
// //     })
// // }
// // const signUpWithGoogle = () => {
// //     return passport.authenticate('google', {
// //         failureRedirect: '/fail',
// //         successRedirect: '/success',
// //         session: false
// //     }),
// //     (req, res) => {
// //         console.log('googke callback')
// //     }
// // };

// // const verifyCallback = (accessToken, refreshToken, profile, done) => {
// //     done(null, profile)
// // }