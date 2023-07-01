const {
  login,
  register,
  logout,
  getAccessStatus,
} = require("../controllers/auth");
const express = require("express");
const authorizationMiddleware = require("../middleware/authorization");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authorizationMiddleware, logout);
router.route("/status").get(authorizationMiddleware, getAccessStatus);
module.exports = router;
