import { Pool } from "pg";
import config from ".";

// POSTGRE-SQL CONNECTION STRING
export const pool = new Pool({
    connectionString: `${config.CONNECTION_STRING}`
});

const initDB = async() => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10, 2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked')) DEFAULT 'available'
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10, 2) NOT NULL CHECK (total_price > 0),
        status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
        )`);
};

export default initDB;