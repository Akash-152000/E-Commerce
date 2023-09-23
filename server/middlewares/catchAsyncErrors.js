module.exports = (myFunction) => (req,res,next) =>{
    Promise.resolve(myFunction(req,res,next)).catch(next)
}



// module.exports: This line exports the higher-order middleware function so that it can be used in other parts of your Node.js application.

// (myFunction) => ...: This is an arrow function that takes myFunction as a parameter. myFunction is expected to be another middleware function that you want to wrap with error handling.

// (req, res, next) => { ... }: This is another arrow function that represents the actual middleware being created. It takes the standard Express middleware parameters: req (request), res (response), and next (the callback function to pass control to the next middleware).

// Promise.resolve(myFunction(req, res, next)): Inside the middleware, it calls myFunction(req, res, next) and wraps it in Promise.resolve(). This step assumes that myFunction returns a Promise or can be asynchronous. Wrapping it in a Promise allows you to handle both synchronous and asynchronous errors in a consistent manner.

// .catch(next): The .catch() block is used to catch any errors that occur within myFunction. If an error occurs, it passes the error to the next function, which effectively passes control to the next middleware in the Express middleware chain.

// In summary, this higher-order middleware function is designed to wrap other middleware functions (myFunction) and add error handling to them. It ensures that any errors occurring within myFunction are caught and passed to the error-handling middleware for consistent error handling throughout your Express application.




