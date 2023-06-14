const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const authController = require("../controllers/auth");

router.get("/products", productController.getAllProducts);

router.get("/:id", productController.getOneProduct);

router.use(authController.protect);

router.get("/deletImage/:id", productController.deleteImageProduct);

router.post(
  "/createProduct",
  productController.setProductUserId,
  productController.createProduct
);

router
  .route("/:id")
  .patch(productController.updateOneProduct)

  .delete(productController.deleteOneProduct);

module.exports = router;
