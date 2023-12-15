import selectAllExercisesModel from "../../models/exercises/selectAllExercisesByIdModel.js";

const listExercisesController = async (req,res,next) => {
    try {
        
        const entries = await selectAllExercisesModel();

        res.send({
            data: entries
        })
    } catch (error) {
        next(error);
    }
}

export default listExercisesController;