import { Sequelize } from "sequelize/types";
import {DataTypes} from "sequelize";

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      _id: {
        type: type.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      label: {
        type: type.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tag",
      timestamps: true,
    }
  );
  return Tag;
};
