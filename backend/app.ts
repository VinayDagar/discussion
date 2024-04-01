import { ErrorView } from "./app/response-view";
import { IErrorInstance, RequestInstance } from "const";
// import authRoutes from "./app/routes/auth";
import { NextFunction, Response } from "express";
import { ValidationError } from "sequelize";
const authRoutes = require('./app/routes/auth')
const userRoutes = require('./app/routes/user')
const postRoutes = require('./app/routes/post')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = require('./config/init')
const db = require('./db/models')

app.use((req: RequestInstance, _res: Response, next: NextFunction) => {
  req.DB = db;
  next();
});

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

app.use((error: IErrorInstance, req: RequestInstance, res: Response, _next: NextFunction) => {
  console.error('Error:: ', { error });
  const status = error.statusCode || 500;

  if (error instanceof ValidationError) {
    const errorResponse = ErrorView({ message: error.message, error });
    return res.status(status).json(errorResponse);
  }

  const message = error.message || 'Something went wrong';

  const errorResponse = ErrorView({ status, message });
  // error = { status, message }
  return res.status(status).json(errorResponse);
});

db.sequelize.sync({ force: false }).then(() => {
  console.info('DB synced!');
}).catch((err: { message: any }) => {
  console.error('Failed to sync ', err.message)
})


