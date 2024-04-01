import { Sequelize } from "sequelize/types";
import { DataTypes } from "sequelize";
import { IUserModel } from "./types/user.type";

const userBeforeHook = require('./hooks/user-before-create')

module.exports = (sequelize: Sequelize, type: typeof DataTypes) => {

  const User = sequelize.define<IUserModel>('User', {
    _id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: type.STRING,
      allowNull: false,
      field: 'first_name',
      validate: {
        min: 3,
      }
    },
    lastName: {
      type: type.STRING,
      allowNull: false,
      field: 'last_name',
      validate: {
        min: 2,
      }
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    profession: {
      type: type.ENUM,
      values: ['student', 'working'],
      allowNull: false,
      defaultValue: 'student'
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    salt: {
      type: type.TEXT,
      allowNull: false,
    },
    phoneNumber: {
      type: type.STRING,
      allowNull: true,
      unique: true,
      field: 'phone_number',
      validate: {
        min: 10,
      }
    }
  }, {
    tableName: 'user',
    timestamps: true,
    hooks: {
      beforeValidate: userBeforeHook,
    },
  });


  // @ts-ignore
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE',
    });

    User.hasOne(models.UserMeta, {
      foreignKey: 'userId',
      as: 'userMeta',
      onDelete: 'CASCADE',
    });
  };
  return User;
};