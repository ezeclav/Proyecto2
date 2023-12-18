import express from "express";

const router = express.Router();

import {
  newUserController,
  loginUserController,
  validateUserController,
  getUserProfileController,
  sendRecoverPassController,
  editUserPasswordController,
} from "../controllers/users/index.js";

import authUserController from "../middlewares/authUserController.js";
import userExistsController from "../middlewares/userExistsController.js";

//proceso de registración, donde se envía x mail el codigo de registro
router.post("/users/register", newUserController);
router.get("/users/validate/:registrationCode", validateUserController);

//proceso de logueo
router.post("/users/login", loginUserController);

//obtener el perfil del usuario
router.get(
  "/users/:userId",
  authUserController,
  userExistsController,
  getUserProfileController
);

//recuperar contraseña --> blanqueo --> envío de mail
router.post("/users/password/recover", sendRecoverPassController);

//toma el codigo de recuperación enviado en el endpoint anterior y
//actualiza la contraseña en la BBDD
router.put("/users/password", editUserPasswordController);

export default router;
