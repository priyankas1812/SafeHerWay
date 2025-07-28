import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import cors
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import userTravelRoutes from "./routes/userTravelRoutes.js";
import conReqRoutes from "./routes/conReqRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGODB_URL;

// ✅ Enable CORS for your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend origin
    credentials: true,
  })
);

// ✅ JSON middleware
app.use(express.json());

// ✅ API routes
app.use("/api", userRoutes);
app.use("/api", otpRoutes);
app.use("/api", userTravelRoutes);
app.use("/api", conReqRoutes);

// ✅ MongoDB connection
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
