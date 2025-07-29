import mongoose from "mongoose";

const userTravelSchema = new mongoose.Schema({
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
    type: [String],
    default: [],
  },
  description: {
    type: String,
    trim: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const userTravel = mongoose.model("userTravel", userTravelSchema);
export default userTravel;
