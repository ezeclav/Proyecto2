import express from "express";

import exerciseRouter from "./exerciseRouter.js";

const router = express.Router();

router.use(exerciseRouter);

export default router;


import adminRouter from './adminRouter.js';
import userRouter from './userRouter.js';

const app = express();

app.use('/admin', adminRouter);
app.use('/user', userRouter);
