import { createTokenAndReturn, verifyPasswordAndReturn } from "../service/auth";
import { IErrorInstance, RequestInstance } from "const";
import { NextFunction, Response } from "express";

exports.registerController = async (req: RequestInstance, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    // @ts-ignore
    const user = await req.DB.User.findOne({
      where: {
        email
      }
    });

    if (user) {
      const error: IErrorInstance = new Error("Email already registered!");
      error.statusCode = 400;
      return next(error);
    }

    // @ts-ignore
    const newUser = await req.DB.User.create({
      email, firstName, lastName, password
    });

    const response = await createTokenAndReturn(newUser, next);
    res.json(response)

  } catch (err) {
    next(err);
  }
};

exports.loginController = async (req: RequestInstance, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
    } = req.body;

    //@ts-ignore
    const user = await req.DB.User.findOne({
      where: {
        email
      }
    });


    if (!user) {
      const error: IErrorInstance = new Error("User not found!");
      error.statusCode = 404;
      return next(error);
    }

    const response = await verifyPasswordAndReturn(user, password, next);

    if(!response) {
      const error: IErrorInstance = new Error('Invalid password!')
      error.statusCode = 401;
      return next(error);
    }

    res.json(response)

  } catch (err) {
    next(err);
  }
};