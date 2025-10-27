// src/services/commentService.ts
import Comment, { IComment } from "../models/Comment.js";
import { Types } from "mongoose";

export const createComment = async (
  taskId: string,
  userId: string,
  content: string
): Promise<IComment> => {
  const comment = new Comment({
    task: new Types.ObjectId(taskId),
    user: new Types.ObjectId(userId),
    content,
  });
  return await comment.save();
};

export const getCommentsByTask = async (taskId: string): Promise<IComment[]> => {
  return await Comment.find({ task: taskId })
    .populate("user", "name email")
    .sort({ createdAt: 1 });
};

export const deleteComment = async (
  commentId: string,
  opts?: { userId?: string; isAdmin?: boolean }
): Promise<IComment | null> => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  if (opts?.isAdmin || (opts?.userId && comment.user.toString() === opts.userId)) {
    return await Comment.findByIdAndDelete(commentId);
  }

  return null;
};
