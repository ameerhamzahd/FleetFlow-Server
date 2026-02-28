import { pool } from "../../config/db";

const getAllUsers = async () => {
    const queryResult = await pool.query(`SELECT * FROM users`);

    return queryResult.rows;
};

const getSingleUser = async(userId: string) => {
    const queryResult = await pool.query(`SELECT id, name, email, phone, role FROM users WHERE id = $1`, [userId]);

    return queryResult.rows[0];
};

const updateUser = async (userId: string, payload: Record<string, unknown>) => {
    const allowedFields = ["name", "email", "phone", "role"];

    const fields: string[] = [];
    const values: any[] = [];
    let userIdx = 1;

    for (const key in payload) {
        if (allowedFields.includes(key)) {
            fields.push(`${key} = $${userIdx}`);
            values.push(payload[key]);
            userIdx++;
        }
    }

    if (!fields.length) {
        return getSingleUser(userId);
    }

    values.push(userId);

    const queryResult = await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = $${userIdx} RETURNING *`, values);

    return queryResult.rows[0];
};

const deleteUser = async (userId: string) => {
    const queryResult = await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

    return queryResult;
}

export const userServices = {
    getAllUsers,
    updateUser,
    deleteUser
};
