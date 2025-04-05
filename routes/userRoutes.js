import express from "express";
import {
  saveUserData,
  getUserData,
  updateSubjectInfo,
  updateUserInfo,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveUserData);
router.get("/:clerkId", authMiddleware, getUserData);
router.put("/update-subject", authMiddleware, updateSubjectInfo);
router.put("/update-user", authMiddleware, updateUserInfo);

export default router;
