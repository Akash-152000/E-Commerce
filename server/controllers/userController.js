const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require('../models/userModel')


// Register User

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name,email,password} = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is sample id",
            url:"sample url",
        }
    })

    res.status(201).json({
        success:true,
        user
    })

})
