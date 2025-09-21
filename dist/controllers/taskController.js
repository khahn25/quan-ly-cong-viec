import taskService from "../services/taskService.js"; // ✅ thêm .js khi dùng ESM
class TaskController {
    async create(req, res) {
        try {
            const task = await taskService.create(req.body);
            res.status(201).json(task);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const tasks = await taskService.getAll();
            res.json(tasks);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async getById(req, res) {
        try {
            const task = await taskService.getById(req.params.id);
            if (!task)
                return res.status(404).json({ message: "Task not found" });
            res.json(task);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async update(req, res) {
        try {
            const task = await taskService.update(req.params.id, req.body);
            if (!task)
                return res.status(404).json({ message: "Task not found" });
            res.json(task);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async delete(req, res) {
        try {
            const task = await taskService.delete(req.params.id);
            if (!task)
                return res.status(404).json({ message: "Task not found" });
            res.json({ message: "Task deleted" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
export default new TaskController();
//# sourceMappingURL=taskController.js.map