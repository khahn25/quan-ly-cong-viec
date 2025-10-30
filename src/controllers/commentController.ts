import { Response } from "express";
import { AuthRequest } from "../types/express.js";
import commentService from "../services/commentService.js";
import Task from "../models/Task.js";

// POST comment với body JSON
export const postCommentBody = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, content } = req.body;
    const userId = req.user?.id;

    if (!taskId || !content || !userId) {
      return res.status(400).json({ message: "Thiếu taskId, content hoặc user" });
    }

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task không tồn tại" });

    const comment = await commentService.createComment(taskId, userId, content);
    res.status(201).json(comment);
  } catch (err: any) {
    console.error("❌ Lỗi thêm comment:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// GET comments theo taskId query param
export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = req.query.taskId as string;
    if (!taskId) return res.status(400).json({ message: "taskId is required" });

    const comments = await commentService.getCommentsByTask(taskId);
    res.json(comments);
  } catch (err: any) {
    console.error("❌ Lỗi lấy comment:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// DELETE comment
export const removeComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.isAdmin || false;

    if (!id || !userId) return res.status(400).json({ message: "Missing id or user" });

    const deleted = await commentService.deleteComment(id, { userId, isAdmin });
    if (!deleted) return res.status(403).json({ message: "Không có quyền xóa comment hoặc comment không tồn tại" });

    res.json({ message: "Comment đã xóa" });
  } catch (err: any) {
    console.error("❌ Lỗi xóa comment:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
