import getPool from "../../database/getPool.js";

const selectExercisesByIdModel = async (id_exercise) => {
    
    const pool = await getPool();

    const [exercise] = await pool.query(
        `
            SELECT e.name, e.description, e.id_photo, e.typology, e.muscle_group, e.equipment, u.username, COALESCE(COUNT(l.id), 0) AS likes
            FROM exercises e
            LEFT JOIN likes l ON l.id = e.id
            INNER JOIN users u ON u.id = e.id
            WHERE e.id = ${id_exercise}
            GROUP BY e.id
            ORDER BY e.createdAt DESC
        `
    );

    const [photos] = await pool.query(
        `
            SELECT id, name FROM photo_exercises WHERE id_exercise = ?
        `,
        [exercise.id]
    );

    exercise[0].photos = photos;

    return exercise[0];

}

export default selectExercisesByIdModel;