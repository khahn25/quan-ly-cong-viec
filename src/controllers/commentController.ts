// src/controllers/commentController.ts
import type { Request, Response } from "express";
import * as commentService from "../services/commentService.js";
import * as notificationService from "../services/notificationService.js";
import Task from "../models/Task.js";

/**
 * Định nghĩa kiểu Request có user từ middleware xác thực
 */
interface AuthRequest extends Request {
  user?: { id: string; email: string; role?: string };
}

/**
 * @route   POST /api/comments
 * @desc    Tạo bình luận mới cho task
 * @access  Private
 */
export const postComment = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, content } = req.body;
    const user = req.user;

    // Kiểm tra đầu vào
    if (!taskId || !content || !user) {
      return res.status(400).json({
        message: "Thiếu taskId hoặc content hoặc user",
      });
    }

    // Tạo bình luận
    const comment = await commentService.createComment(taskId, user.id, content);

    // Sau khi tạo comment, gửi thông báo cho người được giao task (nếu khác user đang comment)
    try {
      const task = await Task.findById(taskId).populate("assignedTo", "_id email name");
      const assignedToId = task?.assignedTo?._id?.toString();

      if (assignedToId && assignedToId !== user.id) {
        await notificationService.createNotification(
          assignedToId,
          "Bình luận mới trên Task",
          `${user.email || "Một người dùng"} đã bình luận: "${content}"`,
          taskId
        );
      }
    } catch (notifyErr) {
      console.error("Lỗi khi tạo notification:", notifyErr);
    }

    // Populate user để trả về thông tin người bình luận
    const populatedComment = await comment.populate("user", "name email");

    res.status(201).json(populatedComment);
  } catch (err: any) {
    console.error("❌ Lỗi khi tạo comment:", err);
    res.status(500).json({
      message: "Lỗi khi tạo comment",
      error: err.message,
    });
  }
};

/**
 * @route   GET /api/comments/:taskId
 * @desc    Lấy danh sách comment theo task
 * @access  Private
 */
export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Thiếu taskId" });
    }

    const comments = await commentService.getCommentsByTask(taskId);
    res.json({
      count: comments.length,
      results: comments,
    });
  } catch (err: any) {
    console.error("❌ Lỗi khi lấy comment:", err);
    res.status(500).json({
      message: "Lỗi khi lấy comment",
      error: err.message,
    });
  }
};

/**
 * @route   DELETE /api/comments/:id
 * @desc    Xóa comment (chỉ chính chủ hoặc admin)
 * @access  Private
 */
export const removeComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!id || !user) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const deleted = await commentService.deleteComment(id, {
      userId: user.id,
      isAdmin: user.role === "admin",
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Không tìm thấy hoặc không có quyền xóa comment này",
      });
    }

    res.json({
      message: "Comment đã được xóa thành công",
      deleted,
    });
  } catch (err: any) {
    console.error("❌ Lỗi khi xóa comment:", err);
    res.status(500).json({
      message: "Lỗi khi xóa comment",
      error: err.message,
    });
  }
};
