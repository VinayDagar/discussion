const fs = require('fs');
const path = require('path');
import { Type_DB } from 'const';
const process = require('process');

import { DataTypes, Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const basename = path.basename(__filename);

const db = {} as Type_DB;

let sequelize;
if (!config.database) {
  sequelize = new Sequelize(process.env.DB_URL as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: any) => {

    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    console.log(model.name, "model.namemodel.name");
    
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  // @ts-ignore
  if (db[modelName].associate) {
    // @ts-ignore
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;


module.exports = db;
