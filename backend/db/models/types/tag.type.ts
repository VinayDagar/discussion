import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export interface ITagInstance {
  _id: string;
  label: string;
}

export interface ITagModel
  extends Model<
    InferAttributes<ITagModel>,
    InferCreationAttributes<ITagModel>
  > {
  _id: CreationOptional<string>;
  label: string;
}
