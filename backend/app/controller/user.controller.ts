import { ITagModel } from "db/models/types/tag.type";
import { JsonView } from "../response-view";
import { RequestInstance } from "const";
import {
  IUserMetaInstance,
  IUserMetaModel,
} from "db/models/types/user-meta.type";
import { NextFunction, Response } from "express";
import { ModelStatic, Op } from "sequelize";
import { IPostModel } from "db/models/types/post.type";

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
    const UserMeta = req.DB.UserMeta as ModelStatic<IUserMetaModel>;

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

exports.getFeaturedPosts = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const UserMeta = req.DB.UserMeta as ModelStatic<IUserMetaModel>;
    const Tag = req.DB.Tag as ModelStatic<ITagModel>;
    const Post = req.DB.Post as ModelStatic<IPostModel>;

    const meta = await UserMeta.findOne({
      where: {
        userId: req.user._id,
      },
    });

    const tags = await Tag.findAll({
      where: {
        _id: { [Op.in]: meta?.tags },
      },
    });

    const tagLabels = tags.map((tag) => ({ [Op.contains]: [tag.label] }));

    const posts = await Post.findAll({
      where: {
        tags: { [Op.or]: tagLabels },
      },
    });

    return res.status(200).json(JsonView(posts));
  } catch (err) {
    next(err);
  }
};
