import deleteExerciseModel from "../../models/exercises/deleteExerciseModel.js";
import { notFoundError } from "../../services/errorService.js";
import { deletePhotoService } from "../../services/photoService.js";

const deleteExercisescontroller = async (req, res, next) => {
  try {
    let { exerciseId } = req.params;

    if (!exerciseId) notFoundError;

    const exercise = await deleteExerciseModel(exerciseId);

    let photoName = await deletePhotoService(photoName);

    res.send({
      status: "ok",
      message: "Ejercicio eliminado con EXITO",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteExercisescontroller;
