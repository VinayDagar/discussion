import { Sequelize, DataTypes } from "sequelize";
import { IUserMetaModel } from "./types/user-meta.type";

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {
  const UserMeta = sequelize.define<IUserMetaModel>(
    "UserMeta",
    {
      _id: {
        type: type.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      profession: {
        type: type.TEXT,
        allowNull: false,
      },
      userId: {
        type: type.UUID,
        field: "user_id",
        allowNull: false,
      },
      tags: {
        type: type.ARRAY(type.UUID),
        allowNull: false,
      },
    },
    {
      tableName: "user_meta",
      timestamps: true,
    }
  );

  // @ts-ignore
  UserMeta.associate = function (models) {
    // associations can be defined here
    UserMeta.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user_meta",
      onDelete: "CASCADE",
    });
  };
  return UserMeta;
};
