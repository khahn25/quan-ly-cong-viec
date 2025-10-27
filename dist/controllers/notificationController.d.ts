import { Request, Response } from "express";
export declare const getUserNotifications: (req: Request, res: Response) => Promise<void>;
export declare const markNotificationAsRead: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAllAsRead: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=notificationController.d.ts.map