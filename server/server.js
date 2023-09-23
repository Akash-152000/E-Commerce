const app = require('./app')
const dotenv = require('dotenv')
const connectToMongo = require('./config/databaseConnection')

// handle Uncaught exceptions
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('SHutting down the server due to Uncaught exceptions');
    process.exit(1);
})


// Config
dotenv.config({path:'server/config/config.env'})

// Connection to database
connectToMongo()

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
})

//Unhandled promise rejection

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('SHutting down the server due to unhandled promise rejection');

    server.close(()=>{
        process.exit(1);
    })
})