const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .normalizeEmail(),
    check("password", "password must to be 8 characters long")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password", "password must to be 8 characters long")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.login
);

router.post("/logout", authController.logout);

router.post("/checkToken", authController.isTokenExpierd);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
  
module.exports = router;
