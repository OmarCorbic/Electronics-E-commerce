const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err.message) {
    return res.status(500).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something went wrong. Please try again later" });
};

module.exports = errorHandlerMiddleware;
