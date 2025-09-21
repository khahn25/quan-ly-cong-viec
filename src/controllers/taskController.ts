// src/controllers/taskController.ts
import type { Request, Response } from "express";
import taskService from "../services/taskService.js"; // ✅ thêm .js khi dùng ESM

class TaskController {
  async create(req: Request, res: Response) {
    try {

    console.log("📩 Task body:", req.body);

      const task = await taskService.create(req.body);
      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAll();
      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const task = await taskService.getById(req.params.id as string);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const task = await taskService.update(req.params.id as string, req.body);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const task = await taskService.delete(req.params.id as string);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new TaskController();
