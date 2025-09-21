import userService from "../services/userService.js";
class UserController {
    async getAll(req, res) {
        try {
            const users = await userService.getAll();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async getById(req, res) {
        try {
            const user = await userService.getById(req.params.id);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async update(req, res) {
        try {
            const user = await userService.update(req.params.id, req.body);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            res.json(user);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async delete(req, res) {
        try {
            const user = await userService.delete(req.params.id);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            res.json({ message: "User deleted" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
export default new UserController();
//# sourceMappingURL=userController.js.map