import { Sequelize } from "sequelize/types";
import { DataTypes } from "sequelize";
import { IReplyModel } from "./types/reply.type";

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {
  const Reply = sequelize.define<IReplyModel>(
    "Reply",
    {
      _id: {
        type: type.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      postId: {
        type: type.UUID,
        allowNull: false,
        field: "post_id",
      },
      userId: {
        type: type.UUID,
        allowNull: false,
        field: "user_id",
      },
    },
    {
      tableName: "reply",
      timestamps: true,
    }
  );

  // @ts-ignore
  Reply.associate = function (models) {
    Reply.belongsTo(models.User, {
      foreignKey: "userId",
    });

    Reply.belongsTo(models.Post, {
      foreignKey: "post_id",
    });
  };
  return Reply;
};
