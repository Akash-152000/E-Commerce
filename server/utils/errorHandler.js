class Errorhandler extends Error{              // Error is inbuilt in node our errorHanlder is inheriting error
    constructor(message, statusCode){
        super(message);                        // calls constructor of parent i.e. Error with message as param
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor)  // A stack trace is a list of function calls that led to the point where the error occurred
    }
}

module.exports = Errorhandler;