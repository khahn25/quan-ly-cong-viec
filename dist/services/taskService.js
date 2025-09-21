// src/services/taskService.ts
import Task from "../models/Task.js";
class TaskService {
    async create(data) {
        const task = new Task(data);
        return await task.save();
    }
    async getAll() {
        return await Task.find().populate("project", "name").populate("assignedTo", "name email");
    }
    async getById(id) {
        return await Task.findById(id).populate("project", "name").populate("assignedTo", "name email");
    }
    async update(id, data) {
        return await Task.findByIdAndUpdate(id, data, { new: true }).populate("project", "name").populate("assignedTo", "name email");
    }
    async delete(id) {
        return await Task.findByIdAndDelete(id);
    }
}
export default new TaskService();
//# sourceMappingURL=taskService.js.map