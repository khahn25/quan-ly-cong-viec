import Notification, { INotification } from "../models/Notification.js";
import { Types } from "mongoose";

/**
 * Tạo thông báo cho 1 user
 */
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  relatedTask?: string
): Promise<INotification> => {
  if (!userId) throw new Error("userId is required for Notification");

  const notif = new Notification({
    user: new Types.ObjectId(userId),
    title,
    message,
    relatedTask: relatedTask ? new Types.ObjectId(relatedTask) : undefined,
  });

  return await notif.save();
};

/**
 * Lấy tất cả notification của user
 */
export const getNotificationsByUser = async (userId: string): Promise<INotification[]> => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

/**
 * Đánh dấu 1 notification là đã đọc
 */
export const markNotificationRead = async (id: string): Promise<INotification | null> => {
  return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
};

/**
 * Đánh dấu tất cả notification của user là đã đọc
 */
export const markAllNotificationsRead = async (userId: string) => {
  return await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
};
