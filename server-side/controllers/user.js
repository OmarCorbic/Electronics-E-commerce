const { StatusCodes } = require("http-status-codes");
const { UnauthorizedError } = require("../errors");
const User = require("../models/User");

const getUserProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.userId }).select(
    "firstName lastName email "
  );

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  res.status(StatusCodes.OK).json({ user });
};

const updateUserProfile = async (req, res) => {
  const { password, firstName, lastName, email } = req.body;
  const user = await User.findOne({ _id: req.userId });

  if (password) {
    user.password = password;
  }
  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (email) {
    user.email = email;
  }
  user.save();

  res.status(StatusCodes.CREATED).json();
};

module.exports = { getUserProfile, updateUserProfile };
