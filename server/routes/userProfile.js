const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const authController = require("../controllers/auth");
const productController = require("../controllers/product");
const userProfileController = require("../controllers/userProfile");

router.use(authController.protect);

router
  .route("/user/:id")
  .get(userProfileController.getMe, userProfileController.getUser)

  .patch(userProfileController.updateUserProfile);

router.patch("/updatePassword/:id", authController.updatePassword);

router
  .route("/userProduct/:id")
  .get(userProfileController.getProduct)

  .patch(userProfileController.updateProduct)

  .delete(userProfileController.deletProduct);

module.exports = router;
