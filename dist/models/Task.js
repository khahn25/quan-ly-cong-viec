import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    deadline: { type: Date },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }
}, { timestamps: true });
const Task = mongoose.model("Task", taskSchema);
export default Task; // ✅ quan trọng: export default
//# sourceMappingURL=Task.js.map