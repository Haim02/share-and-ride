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
  res.status(401).json({
    success: false,
    message: "failure",
  });
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
    failureRedirect: "/google/login/failed",
    session: false,
  }),
  (req, res) => {
    const token = createSentTokenGoogleLogin(req.user, res);
    res.redirect("http://localhost:3001/");
  }
);

module.exports = router;
