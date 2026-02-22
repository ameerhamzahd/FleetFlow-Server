import { Pool } from "pg";
import config from ".";

// POSTGRE-SQL CONNECTION STRING
export const pool = new Pool({
    connectionString: `${config.CONNECTION_STRING}`
});

const initDB = async() => {
    await pool.query(`
        CREATE TYPE user_role AS ENUM ('admin', 'customer');

        CREATE TABLE IF NOT EXISTS users(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(20) NOT NULL,
        role user_role NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);
};

export default initDB;