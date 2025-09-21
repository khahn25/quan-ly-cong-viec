import Project from "../models/Project.js";
class ProjectService {
    async create(data) {
        const project = new Project(data);
        return await project.save();
    }
    async getAll() {
        return await Project.find().populate("owner members", "name email");
    }
    async getById(id) {
        return await Project.findById(id).populate("owner members", "name email");
    }
    async update(id, data) {
        return await Project.findByIdAndUpdate(id, data, { new: true }).populate("owner members", "name email");
    }
    async delete(id) {
        return await Project.findByIdAndDelete(id);
    }
}
export default new ProjectService();
//# sourceMappingURL=projectService.js.map