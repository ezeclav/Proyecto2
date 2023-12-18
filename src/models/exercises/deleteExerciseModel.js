import getPool from "../../database/getPool.js";

const modifExerciseModel = async (exerciseId) => {
  const pool = await getPool();

  const [photoName] = await pool.query(
    `
        SELECT name FROM photo_exercises
        WHERE exerciseId = ${exerciseId} 
    `
  );

  const [photo] = await pool.query(
    `
        DELETE FROM photo_exercises
        WHERE exerciseId = ${exerciseId}
    `
  );

  const [result] = await pool.query(
    `
        DELETE FROM exercises
        WHERE id_exercise = ${exerciseId}
    `
  );

  console.log(photoName, photo, result);

  return photoName;
};

export default modifExerciseModel;
