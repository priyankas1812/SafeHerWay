import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // ✅ Keep UUID but remove `unique`
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true, // ✅ Correct usage
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
  isVerified:{
    type:Boolean,
    default:false,
  }
});

const User = mongoose.model("User", userSchema);
export default User;
