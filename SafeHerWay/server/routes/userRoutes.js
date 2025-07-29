import express from "express";
import {
  createUser,
  getUsers,
  checkUserExists,
  loginUser,
  verifyUser,
  getUserById,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.post("/users/checkexists", checkUserExists);
router.post("/user/loginUser", loginUser);
router.patch("/:id/verify", verifyUser);
router.get("/user/:id", getUserById);
export default router;
