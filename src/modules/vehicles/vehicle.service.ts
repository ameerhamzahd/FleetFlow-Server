import { pool } from "../../config/db";

const createVehicle = async(payload: Record<string, unknown>) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const queryResult = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return queryResult;
};

const getAllVehicles = async () => {
    const queryResult = await pool.query(`SELECT * FROM vehicles`);

    return queryResult;
}

const getSingleVehicle = async(id: string) => {
    const queryResult = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

    return queryResult;
}

const updateVehicle = async(id: string, payload: Record<string, unknown>) => {
    const allowedFields = ["vehicle_name", "type", "registration_number", "daily_rent_price", "availability_status"];

    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for(const key in payload) {
        if(allowedFields.includes(key)) {
            fields.push(`${key} = $${idx}`);
            values.push(payload[key]);
            idx++;
        }
    }

    if(!fields.length) {
        return null;
    }

    values.push(id);

    const queryResult = await pool.query(`UPDATE vehicles SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`, values);

    return queryResult;
};

export const vehicleServices = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle
};