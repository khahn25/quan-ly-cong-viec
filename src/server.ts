import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routers/userRoutes.js";
import projectRoutes from "./routers/projectRoutes.js";
import taskRoutes from "./routers/taskRoutes.js";
import authRoutes from "./routers/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js"; // nhớ .js cho ESM

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// public routes
app.use("/api/auth", authRoutes);

// protected routes
app.use("/api/users", protect, userRoutes);
app.use("/api/projects", protect, projectRoutes);
app.use("/api/tasks", protect, taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
