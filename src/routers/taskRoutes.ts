import express from "express";
import taskController from "../controllers/taskController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", taskController.getAll.bind(taskController));
router.post("/", taskController.create.bind(taskController));
router.get("/:id", taskController.getById.bind(taskController));
router.put("/:id", taskController.update.bind(taskController));
router.delete("/:id", taskController.delete.bind(taskController));

// Upload file
router.post("/:id/upload", upload.array("files", 10), taskController.uploadFiles.bind(taskController));

export default router;
