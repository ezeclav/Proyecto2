import getPool from "../../database/getPool.js";

const insertPhotoModel = async ( name, id_exercise ) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO photo_exercises (name, id_exercise)
            VALUES (?,?)
        `,
        [name, id_exercise]
    );

    const { insertId } = result;

    return insertId;
}

export default insertPhotoModel;