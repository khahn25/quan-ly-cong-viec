import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // 1. Kiểm tra token tồn tại
    if (!authHeader || !authHeader.startsWith("Bearer")) {
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
        // 2. Ép sang unknown trước
        const decoded = jwt.verify(token, secret);
        // 3. Kiểm tra runtime payload
        if (typeof decoded === "object" &&
            decoded !== null &&
            "id" in decoded &&
            "email" in decoded) {
            req.user = { id: decoded.id, email: decoded.email };
            return next();
        }
        else {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }
    catch (err) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map