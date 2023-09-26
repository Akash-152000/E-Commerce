const Errorhandler = require('../utils/errorHandler')

const errorMiddleware = (err,req,res,next) =>{

    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"


    // Wrong mongodb Id error
    if(err.name === "CastError"){
        err.message = `Resource not found. Invalid ${err.path}`
        err = new Errorhandler(err.message,400)
    }

    // Mongoose duplicate key error
    if(err.code === 11000){
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new Errorhandler(err.message,400)
    }

    // Wrong JWT error
    if(err.code === "JsonWebTokenError"){
        err.message = `Jason Web Token is Invalid, Try again`
        err = new Errorhandler(err.message,400)
    }

    // JWT expire error
    if(err.code === "TokenExpiredError"){
        err.message = `Jason Web Token is Expired, Try again`
        err = new Errorhandler(err.message,400)
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
module.exports = errorMiddleware;