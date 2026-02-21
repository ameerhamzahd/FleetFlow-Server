import { Pool } from "pg";
import config from ".";

// POSTGRE-SQL CONNECTION STRING
export const pool = new Pool({
    connectionString: `${config.CONNECTION_STRING}`
});

const initDB = async() => {
    await pool.query(``);
};

export default initDB;