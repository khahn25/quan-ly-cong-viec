import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment extends Document {
  task: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
