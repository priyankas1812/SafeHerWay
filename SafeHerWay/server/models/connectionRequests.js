import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema({
  fromUser: {
    type: String, // UUID as string
    ref: "User",
    required: true,
  },
  toUser: {
    type: String, // UUID as string
    ref: "User",
    required: true,
  },
  travelPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userTravel",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export default mongoose.model("ConnectionRequest", connectionRequestSchema);
