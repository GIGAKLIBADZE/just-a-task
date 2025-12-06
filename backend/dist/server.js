"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const users = JSON.parse(fs_1.default.readFileSync("./src/data/users.json", "utf-8"));
app.get("/users", (res) => {
    res.json(users);
});
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    return res.json({
        message: "Success",
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
        },
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
async function hashPassword(password) {
    const salt = await bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, salt);
}
