const {
  login,
  register,
  logout,
  verifyAccess,
} = require("../controllers/auth");
const express = require("express");
const authorizationMiddleware = require("../middleware/authorization");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify-access").post(verifyAccess);
router.route("/logout").post(authorizationMiddleware, logout);
module.exports = router;
