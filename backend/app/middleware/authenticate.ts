import { IErrorInstance, RequestInstance } from "../../const";
import { NextFunction, Response } from "express";
import { omit } from 'lodash'
import { verifyToken } from "../../utils/jwt-utility";

module.exports = async (req: RequestInstance, res: Response, next: NextFunction) => {
  try {
    let token = req.get('x-access-token');

    if (!token) {
      const err: IErrorInstance = new Error('Unauthorized. Token not found!');
      err.statusCode = 401;
      return next(err);
    }

    token = token.split(' ')[1];

    if (!token) {
      const err: IErrorInstance = new Error('ACCESS-TOKEN is not formatted properly!');
      err.statusCode = 401;
      return next(err);
    }

    const { userId } = verifyToken(token);

    if (!userId) {
      const err: IErrorInstance = new Error('Unauthorized.');
      err.statusCode = 401;
      return next(err);
    }

    const user = await req.DB.User.findOne({
      where: {
        _id: userId
      }
    });

    if (!user) {
      const error: IErrorInstance = new Error('Unauthorized. user not found!');
      error.statusCode = 401;
      return next(error);
    }

    if (user.isAccountLocked) {
      const error: IErrorInstance = new Error('Your account is locked. Please contact support!');
      error.statusCode = 401;
      return next(error);
    }

    req.user = omit(user.dataValues, 'password', 'salt');
    next();

  } catch (err: unknown) {
    const error = err as IErrorInstance
    error.statusCode = 500;
    next(err);
  }
}