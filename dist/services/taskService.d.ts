import { ITask } from "../models/Task.js";
declare class TaskService {
    create(data: Partial<ITask>): Promise<ITask>;
    getAll(): Promise<ITask[]>;
    getById(id: string): Promise<ITask | null>;
    update(id: string, data: Partial<ITask>): Promise<ITask | null>;
    delete(id: string): Promise<ITask | null>;
}
declare const _default: TaskService;
export default _default;
//# sourceMappingURL=taskService.d.ts.map