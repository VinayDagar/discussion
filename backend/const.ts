import { IUserModel } from "db/models/types/user.type";
import { Request } from "express";
import { Model, Sequelize } from "sequelize";

export type Type_DB = { [key: string]: Model } & { sequelize: Sequelize }


export interface RequestInstance extends Request {
  DB: typeof Type_DB;
  user: Partial<IUserModel>
}

export interface IErrorInstance extends Error {
  statusCode?: number;
  extendedMessage?: string
}

export interface AnyObject {
  [key: string]: unknown;
}
