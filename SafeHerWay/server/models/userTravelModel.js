import mongoose from "mongoose";

const userTravelSchema = new mongoose.Schema({
  _id: {
    type: String,
    ref: "User", // Refers to userModel.js
    required: true,
  },
  user: {
    type: String, // refers to User._id (UUID string)
    ref: "User",
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  interests: {
    type: [String], // Example: ["Beach", "Adventure"]
    default: [],
  },
  description: {
    type: String,
    trim: true,
  },
});

const userTravel = mongoose.model("userTravel", userTravelSchema);
export default userTravel;
