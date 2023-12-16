import express from "express";

const router = express.Router();

import authUserController from "../middlewares/authUserController.js";

import {
  exerciseExistsController,
  userExistsController,
  // cantEditController,
} from "../middlewares/index.js";

import {
  newExercisesController,
  listExercisesController,
  getExercisesController,
  favExercisesController,
  // addExercisesPhotoController,
} from "../controllers/exercises/index.js";

///////////////////////////////////////////////////////////////
//                   RUTAS DE EJERCICIOS                     //
///////////////////////////////////////////////////////////////

// Para añadir un nuevo ejercicio
router.post(
  "/exercises",
  authUserController,
  // userExistsController,
  newExercisesController
);

// Para visualizar todos los ejercicios
router.get("/exercises", listExercisesController);

// Para visualizar un ejercicio en particular
router.get(
  "/exercise/:exerciseId",
  exerciseExistsController,
  getExercisesController
);

// Para darle LIKE a un ejercicio
router.post(
  "/exercises/:exerciseId/like",
  authUserController,
  userExistsController,
  exerciseExistsController,
  favExercisesController
);

// Para agregar una foto al ejercicio
router.post(
  "/exercises/:exerciseId/photos",
  authUserController,
  userExistsController,
  exerciseExistsController
  // cantEditController,
  // addExercisesPhotoController
);

export default router;
