import selectExerciseByIdModel from "../models/exercises/selectExerciseByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
  try {
    const { entryId } = req.params;

    const entry = await selectExerciseByIdModel(entryId);

    //si no somos propietarios no podemos editar nada
    if (entry.userId !== req.user.id) unauthorizedUserError();

    next();
  } catch (error) {
    next(error);
  }
};

export default cantEditController;
