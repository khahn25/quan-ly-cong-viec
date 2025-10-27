import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserNotifications, markNotificationAsRead, markAllAsRead, } from "../controllers/notificationController.js";
const router = express.Router();
// Lấy danh sách thông báo của user
router.get("/", protect, getUserNotifications);
// Đánh dấu 1 thông báo là đã đọc
router.patch("/:id/read", protect, markNotificationAsRead);
// Đánh dấu tất cả là đã đọc
router.patch("/read-all", protect, markAllAsRead);
export default router;
//# sourceMappingURL=notificationRoutes.js.map