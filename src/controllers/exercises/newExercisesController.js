import insertExerciseModel from "../../models/exercises/insertExerciseModel.js";
import insertPhotoModel from "../../models/exercises/insertPhotoModel.js";
import { savePhotoService } from "../../services/photoService.js";

const newExercisesController = async (req, res, next) => {
  try {
    const { name, description, typology, muscle_group, equipment, userId } =
      req.body;

    const exerciseId = await insertExerciseModel(
      name,
      description,
      typology,
      muscle_group,
      equipment,
      userId
    );

    let photos = [];

    if (req.files) {
      for (let photo of Object.values(req.files).slice(0, 3)) {
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
      data: {
        entry: {
          id: exerciseId,
          name,
          description,
          typology,
          muscle_group,
          equipment,
          userId,
          photos,
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default newExercisesController;
