const { registerController, loginController } = require('../controller/auth.controller')
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);

module.exports = authRoutes;