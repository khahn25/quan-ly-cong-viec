import { IUser } from "../models/User.js";
declare class UserService {
    getAll(): Promise<IUser[]>;
    getById(id: string): Promise<IUser | null>;
    update(id: string, data: Partial<IUser>): Promise<IUser | null>;
    delete(id: string): Promise<IUser | null>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=userService.d.ts.map