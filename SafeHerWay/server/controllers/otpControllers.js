import express from "express";
import nodemailer from "nodemailer";

const otpStore = new Map();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "patientptest@gmail.com",
    pass: "pgfw noar jhit skgv",
  },
});

// Send email
const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: "OTP Service" <patientptest@gmail.com>,
    to,
    subject: "Your OTP Code",
    text: Your OTP code is: ${otp}. It will expire in 5 minutes.,
  };
  return transporter.sendMail(mailOptions);
};

// Generate OTP
export const generateOTP = async (req, res) => {
  const email = req.body.email?.toLowerCase();

  if (!email) return res.status(400).json({ error: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(email, { otp, expiresAt });

  console.log(OTP for ${email}: ${otp});

  await sendOTPEmail(email, otp);

  return res.status(200).json({ message: "OTP sent successfully" });
};
// verify otp
export const verifyOTPHandler = (req, res) => {
  const email = req.body.email?.toLowerCase();
  const otp = req.body.otp;

  if (!email || !otp) {
    console.warn("Missing email or OTP in request");
    return res.status(400).json({ error: "Email and OTP required" });
  }

  const record = otpStore.get(email);
  console.log("Stored OTP record:", record);

  if (!record) {
    console.warn("No OTP record found for this email");
    return res.status(400).json({ error: "No OTP generated for this email" });
  }

  if (Date.now() > record.expiresAt) {
    console.warn("OTP expired for email:", email);
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired" });
  }

  if (otp !== record.otp) {
    console.warn("Invalid OTP entered for email:", email);
    return res.status(400).json({ error: "Invalid OTP" });
  }

  otpStore.delete(email); // Clear it once used
  console.log("OTP verified successfully for:", email);

  return res.status(200).json({ message: "OTP verified successfully" });
};
