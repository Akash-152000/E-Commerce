const Errorhandler = require('../utils/errorHandler')

const errorMiddleware = (err,req,res,next) =>{

    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"


    // Wrong mongodb Id error
    if(err.name === "CastError"){
        err.message = `Resource not found. Invalid ${err.path}`
        err = new Errorhandler(err.message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
module.exports = errorMiddleware;