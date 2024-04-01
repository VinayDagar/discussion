import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export interface IUserMetaInstance {
  _id: string;
  userId: string;
  profession: string;
  tags: string[];
}

export interface IUserMetaModel
  extends Model<
    InferAttributes<IUserMetaModel>,
    InferCreationAttributes<IUserMetaModel>
  > {
  _id: CreationOptional<string>;
  userId: string;
  profession: string;
  tags: string[];
}
