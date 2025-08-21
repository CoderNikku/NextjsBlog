import mongoose from "mongoose";
require("dotenv").config();

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
