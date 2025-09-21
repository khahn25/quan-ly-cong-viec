// src/models/Project.ts
import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema);

export default Project;
