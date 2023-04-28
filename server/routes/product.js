const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");
const populateDataList = require("../controllers/fecthCitiesData");
const authController = require('../controllers/auth')

router.get("/products", productController.getAllProducts);

router.get("/:id", productController.getOneProduct);

router.get("/deletImage/:id", productController.deleteImageProduct);

router.use(authController.protect)

router.post("/createProduct",productController.setProductUserId, productController.createProduct);

router.route("/:id")
      .patch(productController.updateOneProduct)

      .delete(productController.deleteOneProduct) 


module.exports = router;  