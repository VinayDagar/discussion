import { Sequelize } from "sequelize/types";
import { DataTypes } from "sequelize";
import { ICommentModel } from "./types/comment.type";

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {
  const Comment = sequelize.define<ICommentModel>(
    "Comment",
    {
      _id: {
        type: type.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: type.STRING,
        allowNull: false,
      },
      userId: {
        type: type.UUID,
        allowNull: false,
        field: "user_id",
      },
      postId: {
        type: type.UUID,
        allowNull: false,
        field: "post_id",
      },
    },
    {
      tableName: "comment",
      timestamps: true,
    }
  );

  // @ts-ignore
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });

    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
    });
  };
  return Comment;
};
