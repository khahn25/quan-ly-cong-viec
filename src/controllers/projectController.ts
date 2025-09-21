// src/controllers/projectController.ts
import type { Request, Response } from "express";
import projectService from "../services/projectService.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

class ProjectController {
  async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      // chắc chắn user tồn tại, dùng non-null assertion
      const project = await projectService.create(req.body, req.user!.id);

      res.status(201).json(project);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const projects = await projectService.getAll();
      res.json(projects);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const project = await projectService.getById(req.params.id as string);
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const project = await projectService.update(req.params.id as string, req.body);
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const project = await projectService.delete(req.params.id as string);
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json({ message: "Project deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ProjectController();
