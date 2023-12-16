import express from 'express';
import authUserController from './authUserController.js';

const router = express.Router();

router.get('/dashboard', authUserController('admin'), (req, res) => {
    res.send(`Bienvenido al panel de administración, ${req.user.username}!`);
});

export default router;
