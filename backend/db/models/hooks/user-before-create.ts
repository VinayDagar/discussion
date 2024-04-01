import { Model } from "sequelize";
import { createHash } from "../../../utils/encryptUtility";

const { v1 } = require("uuid");


module.exports = function (instance: Model) {
  const salt = v1();
  const dataValues = instance.dataValues
  const hashedPassword = createHash(salt, dataValues.password);

  dataValues.password = hashedPassword;
  dataValues.salt = salt;

  return Promise.resolve(instance);
};