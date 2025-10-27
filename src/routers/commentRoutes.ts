// src/routers/commentRouter.ts
import express from "express";
import { postComment, getComments, removeComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tạo comment
router.post("/", protect, postComment);

// Lấy comment theo task
router.get("/:taskId", protect, getComments);

// Xóa comment
router.delete("/:id", protect, removeComment);

export default router;
