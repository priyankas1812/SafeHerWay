import express from "express";
import { createUser, getUsers } from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);

export default router;
