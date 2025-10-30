import express from "express";
import { postCommentBody, getComments, removeComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST comment bằng body
router.post("/", protect, postCommentBody);

// GET comment theo query ?taskId=
router.get("/", protect, getComments);

// DELETE comment
router.delete("/:id", protect, removeComment);

export default router;
