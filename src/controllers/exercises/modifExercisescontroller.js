import jwt from "jsonwebtoken";

import modifExerciseModel from "../../models/exercises/modifExerciseModel.js";
import { emptyFieldExerciseError } from "../../services/errorService.js";
import insertPhotoModel from "../../models/exercises/insertPhotoModel.js";
import { savePhotoService } from "../../services/photoService.js";

const modifExercisesController = async (req, res, next) => {
  try {
    let { exerciseId } = req.params;
    let { name, description, typology, muscle_group, equipment } = req.body;

    if (!name && !description && !typology && !muscle_group && !equipment)
      emptyFieldExerciseError;

    const exercise = await modifExerciseModel(
      exerciseId,
      name,
      description,
      typology,
      muscle_group,
      equipment
    );

    let photos = [];

    if (req.files) {
      for (let photo of Object.values(req.files).slice(0, 1)) {
        let photoName = await savePhotoService(photo, 500);

        const photoId = await insertPhotoModel(photoName, exerciseId);

        photos.push({
          id: photoId,
          name: photoName,
        });
      }
    }

    res.send({
      status: "ok",
      message: "Ejercicio modificado con EXITO",
    });
  } catch (error) {
    next(error);
  }
};

export default modifExercisesController;
