import getPool from "../../database/getPool.js";

const selectAllExercisesModel = async () => {
    const pool = await getPool();

    const [exercises] = await pool.query(
        `
            SELECT e.name, e.description, e.id_photo, e.typology, e.muscle_group, e.equipment, u.username, COALESCE(COUNT(l.id), 0) AS likes
            FROM exercises e
            LEFT JOIN likes l ON l.id = e.id
            INNER JOIN users u ON u.id = e.id
            GROUP BY e.id
            ORDER BY e.name DESC  `
    );

    for (const exercise of exercises) {
        const [photos] = await pool.query(
            `
                SELECT id, name FROM photos WHERE id_photo=?
            `,
            [exercise.id]
        );
    
        exercise.photos = photos;
    }
    

    return exercises;
}

export default selectAllExercisesModel;