import express from "express";
import {
  sendConnectionRequestEmail,
  getConnectionRequestsForUser,
  updateConnectionRequestStatus,
} from "../controllers/connectionController.js";

const router = express.Router();

router.post("/sendConReq", sendConnectionRequestEmail);

router.post("/getConReq", getConnectionRequestsForUser);

router.put("/connectionRequests/:requestId", updateConnectionRequestStatus);

export default router;
