const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); 

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
