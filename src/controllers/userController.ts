import type { Request, Response } from "express";
import userService from "../services/userService.js";

type IdRequest = Request<{ id: string }>;

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req: IdRequest, res: Response) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req: IdRequest, res: Response) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req: IdRequest, res: Response) {
    try {
      const user = await userService.delete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new UserController();
