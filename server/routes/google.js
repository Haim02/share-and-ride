const express = require('express');
const router = express.Router();
const passport = require("passport");
require("../controllers/googleOAuth")(passport);
const dotenv = require("dotenv");
const authController = require('../controllers/auth');

dotenv.config({ path: "./config.env" });

// Redirect the user to the Google signin page</em>
router.get(
    "/",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  // Retrieve user data using the access token received</em>
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }), 
    (req, res) => {
        req.user._id = JSON.stringify(req.user._id)
        req.session.user = req.user._id
        console.log(req.session.user)
        // authController.setSession(req?.user, 200, res, req);
        res.redirect('http://localhost:3000')
    } 
  );
  // profile route after successful sign in</em>
  router.get("/", (req, res) => {
    res.redirect('http://localhost:3000')
  });

  module.exports = router;