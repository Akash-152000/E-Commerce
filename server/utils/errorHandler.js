class Errorhandler extends Error{  
    constructor(message, statusCode){
        super(message);                        // calls constructor of parent i.e. Error with message as param
        this.statusCode = statusCode
        console.log("happy",this.message,this.statusCode);            // Error is inbuilt in node our errorHanlder is inheriting error
        Error.captureStackTrace(this,this.constructor)  // A stack trace is a list of function calls that led to the point where the error occurred
    }
}

module.exports = Errorhandler;