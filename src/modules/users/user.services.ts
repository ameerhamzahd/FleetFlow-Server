import { pool } from "../../config/db";

const getAllUsers = async () => {
    const queryResult = await pool.query(`SELECT * FROM users`);

    return queryResult;
};

const updateUser = async (id: string, payload: Record<string, unknown>) => {
    const allowedFields = ["name", "email", "password", "phone", "role"];

    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const key in payload) {
        if (allowedFields.includes(key)) {
            fields.push(`${key} = $${idx}`);
            values.push(payload[key]);
            idx++;
        }
    }

    if (!fields.length) {
        return null;
    }

    values.push(id);

    const queryResult = await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`, values);

    return queryResult;
};

export const userServices = {
    getAllUsers,
    updateUser
};
