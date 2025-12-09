import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import fs from "fs";


// All of the types below declared with 'type' for for employees
type TBirthDate = {
    year: 1901,
    month: 1,
    day: 1
}

type TManager = {
    id: 0,
    first_name: "John",
    last_name: "Snow"
}

type TVisa = {
    issuing_country: "Poland",
    type: "National visa type D",
    start_date: 1652158800000,
    end_date: 1683608400000
}

type TVisas = TVisa[];


type TEmployee = {
    _id: 0,
    isRemoteWork: true,
    user_avatar: string,
    first_name: string,
    last_name: string,
    first_native_name: string,
    last_native_name: string,
    middle_native_name: string
    department: string,
    building: string,
    room: string,
    date_birth: TBirthDate,
    desk_number: number,
    manager: TManager,
    phone: string,
    email: string,
    telegram: string,
    cnumber: string,
    citizenship: string,
    visa: TVisas
}

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

app.get("/employees/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = employees.find((u: TEmployee) => u._id === id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
});

app.post("/sign-in", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const employee = employees.find((emp: TEmployee) => emp.email === email);

    if (!employee) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

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
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
