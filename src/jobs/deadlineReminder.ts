// src/jobs/deadlineReminder.job.ts
import cron from "node-cron";
import dayjs from "dayjs";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";

export const startDeadlineReminderJob = () => {
  console.log("✅ Deadline Reminder Job started");

  // Chạy mỗi 30 phút (hoặc 1h nếu muốn nhẹ hơn)
  cron.schedule("*/30 * * * *", async () => {
    const now = dayjs();
    const next24h = now.add(24, "hour");

    // 🔔 Task sắp đến hạn trong 24h
    const upcomingTasks = await Task.find({
      deadline: { $gte: now.toDate(), $lte: next24h.toDate() },
      status: { $ne: "completed" },
    });

    for (const task of upcomingTasks) {
      await Notification.create({
        userId: task.assignedTo,
        message: `⏰ Task "${task.title}" sắp đến hạn (${dayjs(task.deadline).format("HH:mm DD/MM/YYYY")}).`,
      });
    }

    // ⚠️ Task quá hạn mà chưa hoàn thành
    const overdueTasks = await Task.find({
      deadline: { $lt: now.toDate() },
      status: { $ne: "completed" },
    });

    for (const task of overdueTasks) {
      await Notification.create({
        userId: task.assignedTo,
        message: `⚠️ Task "${task.title}" đã quá hạn (${dayjs(task.deadline).format("HH:mm DD/MM/YYYY")}).`,
      });
    }

    console.log(
      `🔔 Reminder check completed: ${upcomingTasks.length} upcoming, ${overdueTasks.length} overdue.`
    );
  });
};
