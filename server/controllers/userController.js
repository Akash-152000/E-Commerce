const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");

// Register User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "sample url",
    },
  });

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
  return next(new Errorhandler("Please enter both Email and Password", 400));

const user = await User.findOne({email}).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
  });

});
