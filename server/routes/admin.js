const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const adminController = require("../controllers/admin");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password", "password must to be 8 characters long")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  adminController.adminLogin
);

router.get("/logout", adminController.adminLogout);

// router.use(adminController.isAdmin);

router.get("/home/getUserLength", adminController.getUserLength);
router.get("/home/getProductLength", adminController.getProductLength);
router.get("/home/getLastProducts", adminController.getLastProducts);
router.get("/home", adminController.getRentStats);

router.get("/products", adminController.getAllProducts);
router.post("/products/createProduct", adminController.createProduct);
router
  .route("/products/:id")
  .get(adminController.getOneProduct)
  .patch(adminController.updateOneProduct)
  .delete(adminController.deleteOneProduct);

router.get("/products/lastRents/:id", adminController.getLastRentstProduct);

router.get("/users", adminController.getAllUsers);
router.post("/users/createUser", adminController.createUser);
router
  .route("/users/:id")
  .get(adminController.getOneUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

router.get("/users/lastRents/:id", adminController.getLastRentstUser);

router.get("/messages", adminController.getMessages);

module.exports = router;
