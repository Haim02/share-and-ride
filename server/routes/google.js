// const express = require('express');
// const router = express.Router();
// require("../controllers/googleOAuth")(passport);
// require("../controllers/googleOAuth");
// const dotenv = require("dotenv");
// const { createSentToken } = require('../controllers/auth')
// const { createSentTokenGoogleLogin } = require('../controllers/auth')
// // const authController = require('../controllers/auth');

// dotenv.config({ path: "./config.env" });

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google/err', successRedirect: '/google/success', session: false }), (req, res) => {
//   res.status(200).json({ 
//     user: req.user
//   })
// })  

// router.get('/google/success', (req, res) => {
//   console.log('success' ,req.user)
//   res.json(req.user)
// })

// router.get('/google/err', (req, res) => {
//   console.log('err')
//   res.json({err: 'err'})
// })


//   module.exports = router;