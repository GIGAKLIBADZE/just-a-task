var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import fs from "fs";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const employees = JSON.parse(fs.readFileSync("./src/data/employees.json", "utf-8"));
app.get("/employees", (req, res) => {
    res.json(employees);
});
app.get("/employees/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = employees.find((u) => u._id === id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
});
app.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const employee = employees.find((emp) => emp.email === email);
    if (!employee) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = yield bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    return res.json({
        message: "Success",
        user: {
            id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email
        }
    });
}));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
