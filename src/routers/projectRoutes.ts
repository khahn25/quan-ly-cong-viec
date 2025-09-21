// src/routes/projectRoutes.ts
import express from "express";
import projectController from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ai cũng xem được danh sách project
router.get("/", projectController.getAll.bind(projectController));
router.get("/:id", projectController.getById.bind(projectController));

// Cần token mới thêm/sửa/xoá
router.post("/", protect, projectController.create.bind(projectController));
router.put("/:id", protect, projectController.update.bind(projectController));
router.delete("/:id", protect, projectController.delete.bind(projectController));

export default router;
