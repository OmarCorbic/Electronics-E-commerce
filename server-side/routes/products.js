const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  createProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProduct);

module.exports = router;
