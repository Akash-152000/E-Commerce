const app = require('./app')
const dotenv = require('dotenv')
const connectToMongo = require('./config/databaseConnection')

// Config
dotenv.config({path:'server/config/config.env'})

// Connection to database
connectToMongo()

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`);
})