import mongoose from "mongoose";
require("dotenv").config();

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
  await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};


