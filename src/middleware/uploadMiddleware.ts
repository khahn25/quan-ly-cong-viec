// src/middleware/uploadMiddleware.ts
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "src/uploads"); // nếu đang chạy code TS
// hoặc nếu bạn chạy bản build JS (dist):
// const uploadDir = path.join(process.cwd(), "dist/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

export const upload = multer({ storage });
