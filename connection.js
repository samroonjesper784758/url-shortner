const mongoose = require("mongoose");

const connectToMongoose = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    if (conn) {
      console.log("Successfully connected to database");
    }
  } catch (error) {
    throw new Error("error while connecting to database");
  }
};

module.exports = {
  connectToMongoose,
};
