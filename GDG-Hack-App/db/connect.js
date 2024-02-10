const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((error) => {
      console.error("Failed to connect to the database:", error);
    });
};

module.exports = connectDB;