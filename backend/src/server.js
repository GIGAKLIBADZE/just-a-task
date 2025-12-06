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
const users = JSON.parse(fs.readFileSync("./src/data/users.json", "utf-8"));
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
app.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = yield bcrypt.compare(password, user.password);
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
}));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    });
}
