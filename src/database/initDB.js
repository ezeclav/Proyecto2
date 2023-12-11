import getPool from "./getPool.js";
import "dotenv/config";

const { MYSQL_DATABASE } = process.env;

const initDB = async () => {
  try {
    let pool = await getPool();

    // console.log("Elimando base de datos...");
    // await pool.query("DROP DATABASE IF EXISTS gimnasio");

    console.log("Creando base de datos...");
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

    console.log("Eliminando tablas...");
    await pool.query(`USE ${MYSQL_DATABASE}`);
    await pool.query("DROP TABLE IF EXISTS likes, photos, exercises, users");

    console.log("Creando tablas...");

    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
      `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS exercises (
                id_exercise INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                description TEXT NOT NULL,
                typology ENUM('fuerza', 'potencia', 'resistencia'),
                muscle_group VARCHAR(50),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
     `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS photos (
                id_photo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                exerciseId INT NOT NULL,
                FOREIGN KEY (exerciseId) REFERENCES exercises(id_exercise)
            )
    `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id_like INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                exerciseId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id_user),
                FOREIGN KEY (exerciseId) REFERENCES exercises(id_exercise)
            )
    `);
    console.log("Tablas creadas!");
  } catch (error) {
    console.log(error);
  }
};

initDB();
