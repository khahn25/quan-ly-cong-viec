import mongoose, { Document, Types } from "mongoose";
export interface ITask extends Document {
    title: string;
    description?: string;
    project: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    deadline?: Date;
    priority?: "low" | "medium" | "high";
    status?: "pending" | "in-progress" | "completed";
}
declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, {}> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Task;
//# sourceMappingURL=Task.d.ts.map