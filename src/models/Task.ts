import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  project: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  deadline?: Date;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in-progress" | "completed";
  attachments?: { fileName: string; url: string; mimetype: string }[];
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    deadline: { type: Date },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    attachments: [
      {
        fileName: { type: String, required: true },
        url: { type: String, required: true },
        mimetype: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
