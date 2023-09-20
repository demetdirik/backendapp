import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  userProfile,
} from "../controllers/userControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
export default router;
