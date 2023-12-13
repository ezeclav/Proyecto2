import getPool from "../../database/getPool.js";
import sendMailUtil from "../../util/sendMailUtil.js";

const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET recoverPassCode = ?
            WHERE email = ?
        `,
        [recoverPassCode, email]
    );

    const subject = 'Recuperación de contraseña de Gimnasios Fuerza Latina';

    const body = `
            Se ha solicitado la recuperación de la contraseña de Gimnasios Fuerza Latina para este mail.

            Utiliza el siguiente codigo de recuperación para crear una nueva contraseña ${recoverPassCode}

            Si no has sido tú, ignora este email.

            Hecho con ❤️ por el equipo de Gimnasios Fuerza Latina 🎄
    `;

    await sendMailUtil(email, subject, body);

}

export default updateRecoverPassModel;