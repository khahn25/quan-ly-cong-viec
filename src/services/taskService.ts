// src/services/taskService.ts
import Task, { ITask } from "../models/Task.js";

class TaskService {
  async create(data: Partial<ITask>): Promise<ITask> {
    const task = new Task(data);
    return await task.save();
  }

  async getAll(): Promise<ITask[]> {
    return await Task.find()
      .populate("project", "name")
      .populate("assignedTo", "name email");
  }

  async getById(id: string): Promise<ITask | null> {
    return await Task.findById(id)
      .populate("project", "name")
      .populate("assignedTo", "name email");
  }

  async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, data, { new: true })
      .populate("project", "name")
      .populate("assignedTo", "name email");
  }

  async delete(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }

  // Mới: thêm file vào task
  async addFiles(
  taskId: string,
  attachments: { fileName: string; url: string; mimetype: string }[]
): Promise<ITask | null> {
  const task = await Task.findById(taskId);
  if (!task) return null;

  if (!task.attachments) task.attachments = [];
  task.attachments.push(...attachments);

  return task.save();
}

}

export default new TaskService();
