import { NextFunction, Response } from "express";
import { ModelStatic } from "sequelize";

import { ICommentModel } from "../../db/models/types/comment.type";
import { JsonView } from "../response-view";
import { IErrorInstance, RequestInstance } from "../../const";
import {
  IPostInstance,
  IPostModel,
  PostTypeEnum,
} from "../../db/models/types/post.type";
import { IReplyModel } from "../../db/models/types/reply.type";
import { ITagModel } from "../../db/models/types/tag.type";

exports.createPostController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Post = req.DB.Post as ModelStatic<IPostModel>;
    const Tag = req.DB.Tag as ModelStatic<ITagModel>;
    const { title, body, status, attachments, type, tags } =
      req.body as IPostInstance;

    if (!req.user) {
      const error: IErrorInstance = new Error("UnAuthenticated!");
      error.statusCode = 401;
      return next(error);
    }

    const post = await Post.create({
      title,
      body,
      status,
      type,
      attachments,
      userId: req.user._id as string,
      tags,
    });

    Tag.bulkCreate(
      tags.map((tag) => ({ label: tag.trim().toLowerCase() })),
      {
        updateOnDuplicate: ["label"],
      }
    );

    return res.json(JsonView(post, 201));
  } catch (err) {
    next(err);
  }
};

exports.createReplyController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Post = req.DB.Post as ModelStatic<IPostModel>;
    const { postId } = req.params;
    const { title, body, status, attachments }: IPostInstance = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      const error: IErrorInstance = new Error("Post not found!");
      error.statusCode = 404;
      return next(error);
    }

    if (!req.user) {
      const error: IErrorInstance = new Error("Unauthenticated!");
      error.statusCode = 401;
      return next(error);
    }

    const newPost = await Post.create({
      title,
      body,
      status,
      attachments,
      type: PostTypeEnum.Reply,
      userId: req.user._id as string,
    });

    await post.update({
      replyCount: post.replyCount ? post.replyCount + 1 : 1,
    });

    return res.json(JsonView(newPost, 201));
  } catch (err) {
    next(err);
  }
};

exports.deleteReplyController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Post = req.DB.Post as ModelStatic<IPostModel>;
    const Reply = req.DB.Reply as ModelStatic<IReplyModel>;
    const { replyId } = req.params;

    const reply = await Reply.findByPk(replyId);

    if (!reply) {
      const error: IErrorInstance = new Error("Reply not found!");
      error.statusCode = 404;
      return next(error);
    }
    const post = await Post.findByPk(reply.postId);
    if (!post) {
      const error: IErrorInstance = new Error("Reply not found!");
      error.statusCode = 404;
      return next(error);
    }

    await reply.destroy();

    await post.update({
      replyCount: post?.replyCount ? post?.replyCount - 1 : 0,
    });

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.updateReplyController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Post = req.DB.Post as ModelStatic<IPostModel>;
    const { replyId } = req.params;
    const { title, body, status, attachments }: IPostInstance = req.body;

    const post = await Post.findByPk(replyId);

    if (!post) {
      const error: IErrorInstance = new Error("Post not found!");
      error.statusCode = 404;
      return next(error);
    }

    await post.update({
      title,
      body,
      status,
      attachments,
    });

    return res.json(JsonView(post, 200));
  } catch (err) {
    next(err);
  }
};

exports.markSolutionReplyController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Post = req.DB.Post as ModelStatic<IPostModel>;
    const { replyId } = req.params;

    const post = await Post.findByPk(replyId);

    if (!post) {
      const error: IErrorInstance = new Error("Post not found!");
      error.statusCode = 404;
      return next(error);
    }

    if (post.type !== PostTypeEnum.Reply) {
      const error: IErrorInstance = new Error("Invalid post type!");
      error.statusCode = 422;
      return next(error);
    }

    await post.update({
      isSolution: true,
    });

    return res.json();
  } catch (err) {
    next(err);
  }
};

exports.addCommentController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Post = req.DB.Post as ModelStatic<IPostModel>;
    const Comment = req.DB.Comment as ModelStatic<ICommentModel>;
    const { postId } = req.params;
    const { body }: ICommentModel = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      const error: IErrorInstance = new Error("Post not found!");
      error.statusCode = 404;
      return next(error);
    }

    if (!req.user) {
      const error: IErrorInstance = new Error("Unauthenticated!");
      error.statusCode = 401;
      return next(error);
    }

    const comment = await Comment.create({
      body,
      postId,
      userId: req.user._id as string,
    });

    return res.json(JsonView(comment, 201));
  } catch (err) {
    next(err);
  }
};

exports.updateCommentController = async (
  req: RequestInstance,
  res: Response,
  next: NextFunction
) => {
  try {
    const Comment = req.DB.Comment as ModelStatic<ICommentModel>;
    const { commentId } = req.params;
    const { body }: ICommentModel = req.body;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      const error: IErrorInstance = new Error("Comment not found!");
      error.statusCode = 404;
      return next(error);
    }

    await comment.update({
      body,
    });

    return res.json(JsonView(comment, 200));
  } catch (err) {
    next(err);
  }
};
