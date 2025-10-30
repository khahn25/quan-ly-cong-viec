import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  message: string;
  relatedTask?: Types.ObjectId;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedTask: { type: Schema.Types.ObjectId, ref: "Task", default: null },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
export default Notification;
