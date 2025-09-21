import type { Request, Response } from "express";
type IdRequest = Request<{
    id: string;
}>;
declare class UserController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: IdRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: IdRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: IdRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=userController.d.ts.map