import { IUser } from "../models/User.js";
declare class AuthService {
    private generateToken;
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        user: import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        };
        token: string;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=authService.d.ts.map