declare class ProjectService {
    create(data: {
        name: string;
        description?: string;
    }, ownerId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/Project.js").IProject, {}, {}> & import("../models/Project.js").IProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("../models/Project.js").IProject, {}, {}> & import("../models/Project.js").IProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Project.js").IProject, {}, {}> & import("../models/Project.js").IProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/Project.js").IProject, {}, {}> & import("../models/Project.js").IProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/Project.js").IProject, {}, {}> & import("../models/Project.js").IProject & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
declare const _default: ProjectService;
export default _default;
//# sourceMappingURL=projectService.d.ts.map