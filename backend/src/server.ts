import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const employees = JSON.parse(
  fs.readFileSync("./src/data/employees.json", "utf-8")
);

app.get("/employees", (req: Request, res: Response) => {
  res.json(employees);
});

app.get("/employees", ( res: Response) => {
    res.json(employees);
});

app.get("/employees/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = employees.find((u: any) => u.id === id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
});

app.post("/sign-in", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const employee = employees.find((emp: any) => emp.email === email);

    if (!employee) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

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

async function hashPassword(password: string): Promise<string>  {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}