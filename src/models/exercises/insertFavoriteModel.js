import getPool from "../../database/getPool.js";
import { favAlreadyExistsError } from "../../services/errorService.js";

const insertFavoriteModel = async (exerciseId, userId) => {
  const pool = await getPool();

  /////////////////////// COMPROBAMOS SI YA EL USUARIO LE DIO LIKE. //////////////////////

  const [favs] = await pool.query(
    `
            SELECT id_like_exercise FROM like_exercise
            WHERE exerciseId=? AND userId = ?
        `,
    [exerciseId, userId]
  );

  if (favs.length) favAlreadyExistsError();

  /////////////////// SE INSERTA EL LIKE DEL USUARIO //////////////////////
  await pool.query(
    `
            INSERT INTO like_exercise (exerciseId, userId)
            VALUES (?,?)
        `,
    [exerciseId, userId]
  );

  const [favsAvg] = await pool.query(
    `
            SELECT AVG(value) AS avg FROM like_exercise WHERE exerciseId = ${exerciseId}
        `
  );

  return Number(favsAvg[0].avg);
};

export default insertFavoriteModel;
