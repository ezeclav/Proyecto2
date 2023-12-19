import selectUserByIdModel from "../models/users/selectUserByIdModel.js";
import { unauthorizedUserError } from "../services/errorService.js";

const cantEditController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await selectUserByIdModel(userId);

    ////////////////// SI NO SOMOS ADMIN NO PODEMOS EDITAR NINGÚN EJERCICIO ///////////////////
    
    if (user.role !== "admin") unauthorizedUserError();

    next();
  } catch (error) {
    next(error);
  }
};

export default cantEditController;
