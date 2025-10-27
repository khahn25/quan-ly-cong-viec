import mongoose, { Document, Types } from "mongoose";
export interface INotification extends Document {
    user: Types.ObjectId;
    message: string;
    isRead: boolean;
}
declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, {}> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Notification;
//# sourceMappingURL=Notification.d.ts.map