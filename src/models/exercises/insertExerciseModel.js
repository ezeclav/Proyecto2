import getPool from "../../database/getPool.js";

const insertExcerciseModel = async (
  name,
  description,
  typology,
  muscle_group,
  equipment
) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
            INSERT INTO exercises (name, description, typology, muscle_group, equipment)
            VALUES (?,?,?,?,?)
        `,
    [name, description, typology, muscle_group, equipment]
  );

  console.log(result);

  const { insertId } = result;

  return insertId;
};

export default insertExcerciseModel;
