import getPool from "../../database/getPool.js";

const selectAllExercisesModel = async () => {
  const pool = await getPool();

  const [exercises] = await pool.query(
    `
            SELECT e.name, e.description, e.typology, e.muscle_group, e.equipment, COALESCE(COUNT(l.id_like_exercise), 0) AS likes
            FROM exercises e
            LEFT JOIN like_exercises l ON l.id_like_exercise = e.id_exercise
            GROUP BY e.id_exercise
            ORDER BY e.name DESC  
    `
  );

  for (const exercise of exercises) {
    const [photos] = await pool.query(
      `
        SELECT id_photo_exercise, name FROM photo_exercises WHERE exerciseId=?
      `,
      [exercise.id_exercise]
    );
    console.log(photos);

    exercise.photos = photos;
  }

  return exercises;
};

export default selectAllExercisesModel;
