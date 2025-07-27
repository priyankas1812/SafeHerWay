import express from "express";
import {
  createUserTravel,
  getUserUserTravels,
  getAllUserTravels,
  searchUserTravels,
  sendConnectionRequestEmail,
} from "../controllers/userTravelControllers.js";

const router = express.Router();

// POST: Create new user travel
router.post("/usertravel", createUserTravel);

// GET: Get user travel plans by userId
router.get("/usertravel/:userId", getUserUserTravels);

// GET: Get all user travel plans
router.get("/usertravels", getAllUserTravels);

// GET: search filter  sendConnectionRequestEmail
router.get("/userTravels/search", searchUserTravels);

router.post("/userTravels/sendConReq", sendConnectionRequestEmail);

export default router;
