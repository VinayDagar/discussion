import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export interface IReplyModel
  extends Model<
    InferAttributes<IReplyModel>,
    InferCreationAttributes<IReplyModel>
  > {
  _id: CreationOptional<string>;
  postId: string;
  userId: string;
}