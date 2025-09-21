import projectService from "../services/projectService.js";
class ProjectController {
    async create(req, res) {
        try {
            const project = await projectService.create(req.body);
            res.status(201).json(project);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async getAll(req, res) {
        try {
            const projects = await projectService.getAll();
            res.json(projects);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async getById(req, res) {
        try {
            const project = await projectService.getById(req.params.id);
            if (!project)
                return res.status(404).json({ message: "Project not found" });
            res.json(project);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async update(req, res) {
        try {
            const project = await projectService.update(req.params.id, req.body);
            if (!project)
                return res.status(404).json({ message: "Project not found" });
            res.json(project);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async delete(req, res) {
        try {
            const project = await projectService.delete(req.params.id);
            if (!project)
                return res.status(404).json({ message: "Project not found" });
            res.json({ message: "Project deleted" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
export default new ProjectController();
//# sourceMappingURL=projectController.js.map