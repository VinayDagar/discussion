import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export interface ICommentModel
  extends Model<
    InferAttributes<ICommentModel>,
    InferCreationAttributes<ICommentModel>
  > {
  _id: CreationOptional<string>;
  body: string;
  userId: string;
  postId: string;
}
