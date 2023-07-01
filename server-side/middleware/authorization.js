const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authorizationMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new UnauthorizedError("No authorization credentials provided");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid authorization credentials");
  }
};

module.exports = authorizationMiddleware;
