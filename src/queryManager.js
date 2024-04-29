import { pool } from './mysqlConnector.js'
//TODO: fallo funzionare
export async function getAllComputers() {
    const ret = await pool.query("SELECT * FROM pc");
    console.log(ret.rows);
    return ret.rows
}











