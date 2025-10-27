// src/services/projectService.ts
import mongoose from "mongoose";
import Project from "../models/Project.js";

class ProjectService {
  async create(data: { name: string; description?: string }, ownerId: string) {
    const project = new Project({
      ...data,
      owner: new mongoose.Types.ObjectId(ownerId),
      members: [new mongoose.Types.ObjectId(ownerId)],
    });

    await project.save();
    return project;
  }
  
  async getAll() {
    return Project.find().populate("owner", "email");
  }

  async getById(id: string) {
    return Project.findById(id).populate("owner", "email");
  }

  async update(id: string, data: any) {
    return Project.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Project.findByIdAndDelete(id);
  }
}

export default new ProjectService();
