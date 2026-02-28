import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: "admin" | "customer";
}

const signUp = async (payload: SignupPayload) => {
    const { name, email, password, phone, role = "customer" } = payload;

    if (!name || !email || !password || !phone) {
        throw new Error("All fields are required");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    const userEmail = email.toLowerCase();

    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [userEmail]);

    if (existingUser.rowCount !== 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const queryResult = await pool.query(`INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`, [name, userEmail, hashedPassword, phone, role]);

    return queryResult.rows[0];
};

const signIn = async (email: string, password: string) => {
    if (!email || !password) {
        throw new Error("Email and password required");
    }

    const userEmail = email.toLowerCase();

    const queryResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [userEmail]);

    if (queryResult.rowCount === 0) {
        throw new Error("Invalid credentials!!!");
    }

    const user = queryResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials!!!");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET as string, { expiresIn: "7d" });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    };
};

export const authServices = {
    signUp,
    signIn
}