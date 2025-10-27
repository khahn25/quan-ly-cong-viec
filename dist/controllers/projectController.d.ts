import type { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
declare class ProjectController {
    create(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: ProjectController;
export default _default;
//# sourceMappingURL=projectController.d.ts.map