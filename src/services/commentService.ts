import Comment, { IComment } from "../models/Comment.js";
import { Types } from "mongoose";

class CommentService {
  async createComment(taskId: string, userId: string, content: string): Promise<IComment> {
    const comment = new Comment({
      task: new Types.ObjectId(taskId),
      user: new Types.ObjectId(userId),
      content,
    });
    return await comment.save();
  }

  async getCommentsByTask(taskId: string): Promise<IComment[]> {
    return await Comment.find({ task: taskId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
  }

  async deleteComment(commentId: string, opts?: { userId?: string; isAdmin?: boolean }): Promise<IComment | null> {
    const comment = await Comment.findById(commentId);
    if (!comment) return null;

    if (opts?.isAdmin || (opts?.userId && comment.user.toString() === opts.userId)) {
      return await Comment.findByIdAndDelete(commentId);
    }

    return null;
  }
}

export default new CommentService();
