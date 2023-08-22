const User = require("../models/User");
const { BadRequestError } = require("../errors");
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

  const hoursInMilliseconds = 3 * 60 * 60 * 1000; //  3 hours in milliseconds
  const expirationDate = new Date(Date.now() + hoursInMilliseconds);
  res
    .cookie("access_token", token, {
      sameSite: "none",
      expires: expirationDate,
      secure: true,
    })
    .status(StatusCodes.OK)
    .json({
      userId: user._id,
      name: `${user.firstName + " " + user.lastName}`,
    });
};

const logout = (req, res) => {
  return res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(StatusCodes.OK)
    .json();
};

module.exports = { register, login, logout };
