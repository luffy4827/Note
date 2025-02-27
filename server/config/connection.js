const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGO_URL}`);
    if (response) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

connection();
