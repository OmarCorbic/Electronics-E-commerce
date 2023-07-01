const User = require("../models/User");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  await User.create(req.body);
  res.status(201).send();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide e-mail and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Incorrect e-mail");
  }

  const authenticated = await user.comparePasswords(password);

  if (!authenticated) {
    throw new BadRequestError("Incorrect password");
  }

  const token = user.generateJWT();

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(StatusCodes.OK)
    .json({ message: "Successfully logged in!" });
};

const logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(StatusCodes.OK)
    .json({ message: "Successfully logged out!" });
};

const getAccessStatus = (req, res) => {
  res.status(StatusCodes.OK).json({ status: true });
};

module.exports = { register, login, logout, getAccessStatus };
