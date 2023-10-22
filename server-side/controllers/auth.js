const User = require("../models/User");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

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
      sameSite: "strict",
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
  return res.clearCookie("access_token").status(StatusCodes.OK).json();
};

const verifyAccess = async (req, res) => {
  const accessToken = req.cookies.access_token;
  console.log(req.cookies);
  if (!accessToken) {
    throw new UnauthorizedError("No authorization credentials provided");
  }

  try {
    const verified = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    if (!user) {
      console.log("access denied");
      return res.status(StatusCodes.NOT_FOUND).json({ status: false });
    }
    console.log("access granted");
    return res.status(StatusCodes.OK).json({ status: true });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ status: false });
  }
};

module.exports = { register, login, logout, verifyAccess };
