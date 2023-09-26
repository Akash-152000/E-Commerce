const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

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

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new Errorhandler("Please enter both Email and Password", 400));

  const user = await User.findOne({ email }).select("+password"); 

  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

// Forgot password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }
  
  // Get resetPassword token
  
  const resetToken = user.getResetPasswordToken();
  
  await user.save({ validateBeforeSave: false });
  
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
  
  const message = `Your reset password token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email, please ignore it.`

  try {
    

    await sendEmail({
      email:user.email,
      subject:`Ecommerce password recovery`,
      message

    })

    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`
    })

  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));

  }

});


exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user){
      return next(new Errorhandler("Reset password token is invalid or expired",400))
    }

    if(req.body.password !== req.body.confirmPassword){
      return next(new Errorhandler("Password and Confirm password does not match",400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined


    await user.save()

    sendToken(user,200,res)
})