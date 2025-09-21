import { Document, Model } from "mongoose";
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=User.d.ts.map