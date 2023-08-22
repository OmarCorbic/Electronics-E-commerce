const express = require("express");
const { createCheckoutSession } = require("../controllers/payment");
const router = express.Router();

router.route("/checkout-session").post(createCheckoutSession);

module.exports = router;
