// src/models/Project.ts
import mongoose, { Schema } from "mongoose";
const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
const Project = mongoose.model("Project", projectSchema);
export default Project;
//# sourceMappingURL=Project.js.map