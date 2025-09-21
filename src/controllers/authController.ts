// src/controllers/authController.ts
import type { Request, Response } from "express";
import authService from "../services/authService.js";

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.register(req.body);

    // destructuring để loại bỏ password
    const { password, ...userObj } = user.toObject();

    res.status(201).json({ user: userObj, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    // destructuring để loại bỏ password
    const { password: _pwd, ...userObj } = user.toObject();

    res.json({ user: userObj, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
