import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";

const getOwnUserController = async (req, res, next) => {
  try {
    // Obtenemos los datos del usuario logueado.
    const user = await selectUserByIdModel(req.user.id);

    res.send({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getOwnUserController;
