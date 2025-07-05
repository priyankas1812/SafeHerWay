import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGODB_URL;

app.use(express.json());
app.use("/api", userRoutes); // Base path for user routes
app.use("/api", otpRoutes);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected successfully...");
    app.listen(port, () => {
      console.log("Server running on port:", port);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
