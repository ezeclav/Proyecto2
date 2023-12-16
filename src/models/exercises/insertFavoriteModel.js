import getPool from "../../database/getPool.js";
import { favAlreadyExistsError } from "../../services/errorService.js";

const insertFavoriteModel = async (id_exercise, id_user) => {
    const pool = await getPool();

/////////////////////// COMPROBAMOS SI YA EL USUARIO LE DIO LIKE. //////////////////////

    const [favs] = await pool.query(
        `
            SELECT id FROM like_exercise
            WHERE id_user = ? AND id_exercise=?
        `,
        [id_user, id_exercise]
    );

    if(favs.length) favAlreadyExistsError();

    /////////////////// SE INSERTA EL LIKE DEL USUARIO //////////////////////
    await pool.query(
        `
            INSERT INTO like_exercise (id_user, id_exercise)
            VALUES (?,?)
        `,
        [id_user, id_exercise]
    );

    const [favsAvg] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM like_exercise WHERE id_like = ${id_exercise}
        `
    );

    return Number(favsAvg[0].avg);
}

export default insertFavoriteModel;