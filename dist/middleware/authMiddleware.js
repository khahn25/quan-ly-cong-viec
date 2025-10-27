import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET not set");
        return res.status(500).json({ message: "Server configuration error" });
    }
    try {
        // decode token -> lấy user id
        const decoded = jwt.verify(token, secret);
        // check user trong DB
        const user = await User.findById(decoded.id).select("_id email");
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        // gán vào req.user để controller dùng
        req.user = { id: user._id.toString(), email: user.email };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map