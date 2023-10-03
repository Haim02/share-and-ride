const express = require("express");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv");
const { createSentTokenGoogleLogin } = require("../controllers/auth");
const { getUserFromCookie } = require("../controllers/auth");
const authController = require("../controllers/auth");

dotenv.config({ path: "./config.env" });

router.get("/google/login/success", (req, res) => {
  getUserFromCookie(req, res);
}); 
 
router.get("/google/login/failed", (req, res) => {
   res.redirect("https://www.shareandride.site/login");
});

router.get( 
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://www.shareandride.site/login",
    session: false,
  }),
  (req, res) => {
    createSentTokenGoogleLogin(req.user, res);
    res.redirect('https://www.shareandride.site/')
  }
);

module.exports = router;
