const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/user");
const authorizationMiddleware = require("../middleware/authorization");
const router = express.Router();

router
  .route("/profile")
  .get(authorizationMiddleware, getUserProfile)
  .patch(authorizationMiddleware, updateUserProfile);

module.exports = router;
