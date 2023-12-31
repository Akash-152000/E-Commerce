const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((data) => console.log(`MongoDB Connected with server: ${data.connection.host}`))
};

module.exports = connectToMongo