import express from "express";
import {
  getResources,
  addResource,
  deleteResource,
} from "../controllers/resourceController.js";
import clerkMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", clerkMiddleware, getResources);
router.post("/add", clerkMiddleware, addResource);
router.delete("/:id", clerkMiddleware, deleteResource);

export default router;
