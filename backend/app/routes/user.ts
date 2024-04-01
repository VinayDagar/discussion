const { getLoggedInUserController } = require('../controller/user')
const authenticate = require('../middleware/authenticate')
// import { JsonView } from 'app/response-view';
// import { RequestInstance } from 'const';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/me', authenticate, getLoggedInUserController);

module.exports = userRoutes;