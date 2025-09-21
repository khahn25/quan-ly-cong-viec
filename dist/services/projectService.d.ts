import { IProject } from "../models/Project.js";
declare class ProjectService {
    create(data: Partial<IProject>): Promise<IProject>;
    getAll(): Promise<IProject[]>;
    getById(id: string): Promise<IProject | null>;
    update(id: string, data: Partial<IProject>): Promise<IProject | null>;
    delete(id: string): Promise<IProject | null>;
}
declare const _default: ProjectService;
export default _default;
//# sourceMappingURL=projectService.d.ts.map