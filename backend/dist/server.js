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
const employees = JSON.parse(fs_1.default.readFileSync("./src/data/employees.json", "utf-8"));
app.get("/employees", (req, res) => {
    res.json(employees);
});
app.get("/employees", (res) => {
    res.json(employees);
});
app.get("/employees/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = employees.find((u) => u.id === id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body;
    const employee = employees.find((emp) => emp.email === email);
    if (!employee) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, employee.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json({
        message: "Success",
        user: {
            id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
async function hashPassword(password) {
    const salt = await bcrypt_1.default.genSalt(10);
    return bcrypt_1.default.hash(password, salt);
}
