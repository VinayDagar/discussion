const { registerController, loginController } = require('../controller/auth')
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);

module.exports = authRoutes;