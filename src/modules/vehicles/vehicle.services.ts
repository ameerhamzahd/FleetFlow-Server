import { pool } from "../../config/db";

interface Vehicle {
    vehicle_name: string;
    type: "car" | "bike" | "van" | "SUV";
    registration_number: string;
    daily_rent_price: number;
    availability_status: "available" | "booked";
}

const createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = vehicle;

    const queryResult = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return queryResult.rows[0];
};

const getAllVehicles = async (): Promise<Vehicle[]> => {
    const queryResult = await pool.query(`SELECT * FROM vehicles`);

    return queryResult.rows;
}

const getSingleVehicle = async (vehicleId: string): Promise<Vehicle | null> => {
    const queryResult = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);

    return queryResult.rows[0] || null;
}

const updateVehicle = async (vehicleId: string, vehicle: Partial<Vehicle>): Promise<Vehicle | null> => {
    const allowedFields = ["vehicle_name", "type", "registration_number", "daily_rent_price", "availability_status"];

    const fields: string[] = [];
    const values: any[] = [];
    let vehicleIdx = 1;

    for (const key in vehicle) {
        if (allowedFields.includes(key)) {
            fields.push(`${key} = $${vehicleIdx}`);
            values.push((vehicle as any)[key]);
            vehicleIdx++;
        }
    }

    if (!fields.length) {
        return getSingleVehicle(vehicleId);
    }

    values.push(vehicleId);

    const queryResult = await pool.query(`UPDATE vehicles SET ${fields.join(", ")} WHERE id = $${vehicleIdx} RETURNING *`, values);

    return queryResult.rows[0] || null;
};

const deleteVehicle = async (vehicleId: string) => {
    const queryResult = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [vehicleId]);

    return queryResult;
}

export const vehicleServices = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};