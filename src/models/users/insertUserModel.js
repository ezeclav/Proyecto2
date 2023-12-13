import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";

import sendMailUtil from "../../util/sendMailUtil.js";

import {
  emailAlReadyRegistratedError,
  userAlReadyRegistratedError,
} from "../../services/errorService.js";

const insertUserModel = async (username, email, password, registrationCode) => {
  const pool = await getPool();

  let [user] = await pool.query(
    `
            SELECT id_user FROM users WHERE username = ?
        `,
    [username]
  );

  if (user.length) {
    userAlReadyRegistratedError();
  }

  [user] = await pool.query(
    `
            SELECT id_user FROM users WHERE email = ?
        `,
    [email]
  );

  if (user.length) {
    emailAlReadyRegistratedError();
  }

  /**hacer logica de envio de email */
  const emailSubject = "Activa tu usuario en Gimnasios Fuerza Latina";

  const emailBody = `
            ¡Bienvenid@ ${username}!

            Gracias por registrarte en Gimnasios Fuerza Latina. Para activar tu cuenta haga click en el siguiente enlace:

            <a href="http://localhost:3001/users/validate/${registrationCode}">Activar mi cuenta</a>
    `;

  await sendMailUtil(email, emailSubject, emailBody);

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `
            INSERT INTO users (username, email, password, registrationCode)
            VALUES (?,?,?,?)
        `,
    [username, email, hashedPassword, registrationCode]
  );
};

export default insertUserModel;
