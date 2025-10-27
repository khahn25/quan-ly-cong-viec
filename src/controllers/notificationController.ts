import type { Request, Response } from "express";
import * as notificationService from "../services/notificationService.js";

/**
 * Lấy danh sách thông báo của user đang đăng nhập
 */
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const notifications = await notificationService.getNotificationsByUser(userId);
    res.status(200).json({ count: notifications.length, results: notifications });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông báo", error });
  }
};

/**
 * Đánh dấu 1 thông báo là đã đọc
 */
export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Thiếu ID thông báo" });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const notif = await notificationService.markNotificationRead(id);
    if (!notif || notif.user.toString() !== userId) {
      return res.status(404).json({ message: "Không tìm thấy thông báo" });
    }

    res.status(200).json({ message: "Đã đánh dấu là đã đọc", notification: notif });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật thông báo", error });
  }
};

/**
 * Đánh dấu tất cả thông báo của user là đã đọc
 */
export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await notificationService.markAllNotificationsRead(userId);
    res.status(200).json({ message: "Tất cả thông báo đã được đánh dấu là đã đọc" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đánh dấu tất cả thông báo", error });
  }
};
