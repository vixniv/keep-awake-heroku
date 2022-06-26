const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    // console.log(connection.connection);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
