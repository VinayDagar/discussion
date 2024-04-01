import { JsonView } from "../response-view";
import { RequestInstance } from "const";
import {
  IUserMetaInstance,
  IUserMetaModel,
} from "db/models/types/user-meta.type";
import { NextFunction, Response } from "express";
import { ModelStatic } from "sequelize";

exports.getLoggedInUserController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json(JsonView(req.user));
};

exports.updateMetaController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const UserMeta = req.DB.Post as ModelStatic<IUserMetaModel>;

    const { profession, tags, userId } = req.body as IUserMetaInstance;

    const meta = await UserMeta.create({
      profession,
      tags,
      userId,
    });

    return res.status(201).json(JsonView(meta));
  } catch (err) {
    next(err);
  }
};
