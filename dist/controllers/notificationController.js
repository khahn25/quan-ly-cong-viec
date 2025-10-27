import Notification from "../models/Notification.js";
// 📬 Lấy danh sách thông báo của user đang đăng nhập
export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .limit(50); // chỉ lấy tối đa 50 thông báo gần nhất
        res.status(200).json({ count: notifications.length, results: notifications });
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông báo", error });
    }
};
// 🟢 Đánh dấu 1 thông báo là đã đọc
export const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const notification = await Notification.findOneAndUpdate({ _id: id, userId }, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Không tìm thấy thông báo" });
        }
        res.status(200).json({ message: "Đã đánh dấu là đã đọc", notification });
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật thông báo", error });
    }
};
// 🔵 Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.updateMany({ userId, isRead: false }, { isRead: true });
        res.status(200).json({ message: "Tất cả thông báo đã được đánh dấu là đã đọc" });
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi khi đánh dấu tất cả thông báo", error });
    }
};
//# sourceMappingURL=notificationController.js.map