import { pool } from "../../config/db";

const getAllUsers = async () => {
    const queryResult = await pool.query(`SELECT * FROM users`);

    return queryResult;
}
export const userServices = {
    getAllUsers,
};
