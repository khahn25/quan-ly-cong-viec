import express from "express";
import projectController from "../controllers/projectController.js";
const router = express.Router();
router.get("/", projectController.getAll.bind(projectController));
router.post("/", projectController.create.bind(projectController));
router.get("/:id", projectController.getById.bind(projectController));
router.put("/:id", projectController.update.bind(projectController));
router.delete("/:id", projectController.delete.bind(projectController));
export default router;
//# sourceMappingURL=projectRoutes.js.map