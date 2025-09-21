// src/services/projectService.ts
import Project from "../models/Project.js";

class ProjectService {
  async create(data: { name: string; description?: string }, ownerId: string) {
    const project = new Project({
      ...data,
      owner: ownerId,       // gán trực tiếp string ObjectId
      members: [ownerId],   // owner auto thành member
    });

    return await project.save();
  }

  async getAll() {
    return Project.find()
      .populate("owner", "name email")
      .populate("members", "name email");
  }

  async getById(id: string) {
    return Project.findById(id)
      .populate("owner", "name email")
      .populate("members", "name email");
  }

  async update(id: string, data: any) {
    return Project.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Project.findByIdAndDelete(id);
  }
}

export default new ProjectService();
