import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export enum ProfessionEnum {
  Student = 'student',
  Working = 'working'
}


export interface IUserInstance {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession?: ProfessionEnum;
  password: string;
  salt: string;
  phoneNumber?: string;
}

export interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  _id: CreationOptional<string>;
  firstName: string;
  lastName: string;
  email: string;
  profession?: ProfessionEnum;
  password: string;
  salt: string;
  phoneNumber?: CreationOptional<string>;
}