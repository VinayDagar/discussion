import { Sequelize } from "sequelize/types";
import {DataTypes} from "sequelize";
import { ITagModel } from "./types/tag.type";

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {
  const Tag = sequelize.define<ITagModel>(
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
        unique: true
      },
    },
    {
      tableName: "tag",
      timestamps: true,
    }
  );
  return Tag;
};
