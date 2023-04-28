const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
// const passport = require("passport");
const dotenv = require("dotenv");
// const { Strategy } = require("passport-google-oauth20");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

// dotenv.config({ path: "./config.env" });

const successLoginUrl = "http://localhost:3000";
const errorLoginUrl = "http://localhost:3000/login/error";

// const verifyCallback = (accessToken, refreshToken, profile, done) => {
//       console.log('google profile:', profile)
//     done(null, profile)
// }

// passport.use(new Strategy({
//     callbackURL: 'http://localhost:3000//auth/google/callback',
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET
// }, verifyCallback))

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// router.get('/api/user/auth/google/callback',
//      passport.authenticate('google', {
//       failureRedirect: '/faiil',
//       successRedirect: '/p',
//       session: false,
// }), (req, res) => {
//       console.log('google callback')
//       res.redirect('/')
// })

// router.get('/faiil', (req, res) => {
// return res.send('Faild to login')
// })

// router.get('/p', (req, res) => {
// return res.send('success to login')
// })

router.post(
  "/auth/signup",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
    check("password", "password must to be 8 characters long")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    // body('confirmPassword').custom((value, {req}) => {
    //    if (value !== req.body.password) {
    //        throw new Error('Password have to match')
    //    }
    //    return true;
    // })
  ],
  authController.signup
);

router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password", "password must to be 8 characters long")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.login
);

router.get("/auth/logout", authController.logout);

router.get("/auth/isLoggedIn", authController.isLoggedIn);
// router.get('login/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// router.get('auth/google/callcack',
//        passport.authenticate('google', {
//              failureMessage: 'Cannot login to Google, Please try again later!',
//              failureRedirect: errorLoginUrl,
//              successRedirect: successLoginUrl
//             }),
//             (req, res) => {
//                   console.log('user', req.user)
//                   res.send('Thank you for signin')
//              }
//             )

// router.post('/forgot-password', authController.forgotPassword);
// router.patch('/reset-password/:id/:token', authController.resetPasswordPost)

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
// router.use(authController.protect);

// router
//   .route("/:id")
//   .get(userController.getOneUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
