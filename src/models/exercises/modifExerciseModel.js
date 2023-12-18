import getPool from "../../database/getPool.js";

const modifExerciseModel = async (
  id_exercise,
  name,
  description,
  typology,
  muscle_group,
  equipment
) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
            
            UPDATE exercises
            SET name = ?, description = ?, typology = ?, muscle_group = ?, equipment = ?
            WHERE id_exercise = ${id_exercise}
        `,
    [name, description, typology, muscle_group, equipment]
  );

  console.log(result);
};

export default modifExerciseModel;
