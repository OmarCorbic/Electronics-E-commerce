const notFoundMiddleware = (req, res, next) => {
  return res.status(404).send("Unknown route");
};

module.exports = notFoundMiddleware;
