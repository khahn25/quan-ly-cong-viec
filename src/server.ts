// src/server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routers/authRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import projectRoutes from "./routers/projectRoutes.js";
import taskRoutes from "./routers/taskRoutes.js";
import notificationRoutes from "./routers/notificationRoutes.js";
import commentRoutes from "./routers/commentRoutes.js";

import { protect } from "./middleware/authMiddleware.js";
import { startDeadlineReminderJob } from "./jobs/deadlineReminder.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware cơ bản
app.use(cors());
app.use(express.json());

// -------------------------
// 🔐 Public routes
// -------------------------
app.use("/api/auth", authRoutes);

// -------------------------
// 🔒 Protected routes
// -------------------------
app.use("/api/users", protect, userRoutes);
app.use("/api/projects", protect, projectRoutes);
app.use("/api/tasks", protect, taskRoutes);
app.use("/api/notifications", protect, notificationRoutes);
app.use("/api/comments", protect, commentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------------
// 🕒 Background jobs
// -------------------------
startDeadlineReminderJob();

// -------------------------
// 🚀 Server start
// -------------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

// Optional: fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
