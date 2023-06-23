// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const connection = require('./database');
// const User = require('../models/user');

// const verifyCallback = (username, password, done) => {
//     User.findOne({ username: username })
//     .then((user) => {
//         if(!user) {
//             return done(null, false)
//         }
 
//         const isValid = validPassword(password, user.hash);

//         if(isValid) {
//             return done(null, user)
//         } else {
//             return done(null, false)
//         }
//     })
//     .catch((err) => {
//         done(err)
//     })
// }


// //save the session to the cookie
// passport.serializeUser((user, done) => {
//     done(null, user.id)
// });

// //read the session from the cookie
// passport.deserializeUser( async(id, done) => {
//     const user = await User.findById(id)
//     done(null, user)
// });

// app.set('trust proxy', 1)
 
// // app.use(cookieSession({
// //     name: 'session',
// //     secret: process.env.COOKIE_KEY,
// //     keys: [process.env.COOKIE_KEY],
// //     maxAge: 4 * 60 * 60 * 1000,
// //     saveUninitialized: false,
// //     unset: 'destroy',
// //     cookie: {
// //         maxAge: 4 * 60 * 60 * 1000,
// //         secure: true,
// //         httpOnly: true,
// //     }
// // }))

// const sessionStore = new MongoStore({
//     mongooseConnection: mongoCreateConnection,
//     collection: 'session'
// })

// app.use(session({
//     secret: process.env.session_secret,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: 4 * 60 * 60 * 1000,
//         secure: true,
//         httpOnly: true,
//     }
// }))
