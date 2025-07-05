import express from "express";
import {
  generateOTP,
  verifyOTPHandler,
} from "../controllers/otpControllers.js";

const router = express.Router();

router.post("/otp/generate", generateOTP);

router.post("/otp/verify", verifyOTPHandler);

export default router;
