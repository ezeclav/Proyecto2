import selectExerciseByIdModel from "../../models/exercises/selectExerciseByIdModel.js";

const getExercisesController = async (req,res,next) => {
    try {
        const {id_exercise} = req.params;

        const exercise = await selectExerciseByIdModel(id_exercise);

        res.send({
            status: 'ok',
            data: id_exercise
        });

    } catch (error) {
        next(error);
    }
}

export default getExercisesController;
