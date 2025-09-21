// src/services/authService.ts
import User, { IUser } from "../models/User.js";
import jwt from "jsonwebtoken";

class AuthService {
  private generateToken(user: IUser) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(
      { id: user._id.toString(), email: user.email },
      secret,
      { expiresIn: "1d" }
    );
  }

  async register(data: { name: string; email: string; password: string }) {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error("Email already exists");

    const user = new User(data);
    await user.save();
    const token = this.generateToken(user);
    return { user, token };
  }

  async login(email: string, password: string) {
    if (!email || !password) throw new Error("Email and password are required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = this.generateToken(user);
    return { user, token };
  }
}

export default new AuthService();
