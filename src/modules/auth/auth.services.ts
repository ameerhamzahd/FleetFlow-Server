import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

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

export const authServices = {
    signUp
}