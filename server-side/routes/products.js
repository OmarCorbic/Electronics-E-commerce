const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
  getCategories,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/categories").get(getCategories);
router.route("/product/:id").get(getProduct);

module.exports = router;
