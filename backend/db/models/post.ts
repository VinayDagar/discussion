import { Sequelize } from "sequelize/types";
import {DataTypes} from 'sequelize';
import { IPostModel } from "./types/post.type";

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {

  const Post = sequelize.define<IPostModel>('Post', {
    _id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type: type.ENUM,
      values: ['post', 'reply'],
      defaultValue: 'post'
    },
    title: {
      type: type.STRING,
      allowNull: false,
      validate: {
        min: 10,
      }
    },
    body: {
      type: type.STRING,
      allowNull: false,
    },
    userId: {
      type: type.UUID,
      allowNull: false,
      field: 'user_id'
    },
    status: {
      type: type.ENUM,
      values: ['draft', 'published', 'archived'],
      allowNull: false,
      defaultValue: 'draft'
    },
    tags: {
      type: type.ARRAY(type.STRING),
      allowNull: false,
    },
    attachments: {
      type: type.ARRAY(type.STRING),
      allowNull: true,
    },
    replyCount: {
      type: type.INTEGER,
      defaultValue: 0,
      field: 'reply_count'
    },
    isSolution: {
      type: type.BOOLEAN,
      defaultValue: false,
      field: 'is_solution'
    }
  }, {
    tableName: 'post',
    timestamps: true,
  });

  // @ts-ignore
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    Post.hasMany(models.Reply, {
      foreignKey: 'postId',
      as: 'replies',
      onDelete: 'CASCADE',
    });

    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
    });
  };
  return Post;
};