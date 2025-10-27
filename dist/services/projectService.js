// src/services/projectService.ts
import Project from "../models/Project.js";
class ProjectService {
    async create(data, ownerId) {
        const project = new Project({
            ...data,
            owner: ownerId, // gán trực tiếp string ObjectId
            members: [ownerId], // owner auto thành member
        });
        return await project.save();
    }
    async getAll() {
        return Project.find()
            .populate("owner", "name email")
            .populate("members", "name email");
    }
    async getById(id) {
        return Project.findById(id)
            .populate("owner", "name email")
            .populate("members", "name email");
    }
    async update(id, data) {
        return Project.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return Project.findByIdAndDelete(id);
    }
}
export default new ProjectService();
//# sourceMappingURL=projectService.js.map