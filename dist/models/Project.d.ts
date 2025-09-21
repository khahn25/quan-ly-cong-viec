import { Types, Document, Model } from "mongoose";
export interface IProject extends Document {
    name: string;
    description?: string;
    owner: Types.ObjectId;
    members: Types.ObjectId[];
}
declare const Project: Model<IProject>;
export default Project;
//# sourceMappingURL=Project.d.ts.map