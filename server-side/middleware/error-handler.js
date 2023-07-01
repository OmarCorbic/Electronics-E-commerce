const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later",
    statusCode: err.statusCode || 500,
  };

  if (err.name && err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((err) => err.message)
      .join(". ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name && err.name === "CastError") {
    customError.message = `Invalid ${err.path} field`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another one.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
