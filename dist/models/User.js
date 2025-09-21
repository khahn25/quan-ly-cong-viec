import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
// Schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
// Hash password trước khi lưu
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// So sánh mật khẩu
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// Tạo Model
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=User.js.map