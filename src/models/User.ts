import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Định nghĩa interface cho User
export interface IUser extends Document {
  _id: string; // fix lỗi _id unknown
  name: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password trước khi lưu
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// So sánh mật khẩu
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Tạo Model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
