import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = JSON.parse(fs.readFileSync("./src/data/users.json", "utf-8"));

app.get("/users", ( res: Response) => {
    res.json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = users.find((u: any) => u.id === id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
});

app.post("/sign-in", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

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

async function hashPassword(password: string): Promise<string>  {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}