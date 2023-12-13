import getPool from "../../database/getPool.js";
import bcrypt from 'bcrypt';
import { recoveryCodeError } from "../../services/errorService.js";
import selectUserByEmailModel from "./selectUserByEmailModel.js";


const updateUserPassModel = async (email, recoverPassCode, newPassword) => {
    const pool = await getPool();

    
    const user = await selectUserByEmailModel(email);
    
    if(!user || user.recoverPassCode !== recoverPassCode) recoveryCodeError();

    const hashPass = await bcrypt.hash(newPassword,10);

    await pool.query(
        `
            UPDATE users
            SET password = ?, recoverPassCode = null
            WHERE recoverPassCode = ?
        `,
        [hashPass, recoverPassCode]
    );

}

export default updateUserPassModel