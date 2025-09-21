// src/services/userService.ts
import User from "../models/User.js";
class UserService {
    async getAll() {
        return await User.find().select("-password");
    }
    async getById(id) {
        return await User.findById(id).select("-password");
    }
    async update(id, data) {
        // If password included, pre-save hook will hash it when using save()
        if (data.password) {
            const user = await User.findById(id);
            if (!user)
                return null;
            user.set(data);
            await user.save();
            return user;
        }
        return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
    }
    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}
export default new UserService();
//# sourceMappingURL=userService.js.map