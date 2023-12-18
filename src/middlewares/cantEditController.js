import selectUserByIdModel from "../models/users/selectUserByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await selectUserByIdModel(userId);

    //si no somos ADMIN no podemos editar ningún ejercicio
    if (user.role !== "admin") unauthorizedUserError();

    next();
  } catch (error) {
    next(error);
  }
};

export default cantEditController;
