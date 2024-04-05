import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export enum PostTypeEnum {
  Post = "post",
  Reply = "reply",
}

export enum PostStatusEnum {
  Draft = "draft",
  Published = "published",
  Archived = "archived",
}

export interface IPostInstance {
  _id: string;
  type: PostTypeEnum;
  title: string;
  body: string;
  userId: string;
  status: PostStatusEnum;
  attachments?: string[];
  replyCount?: number;
  tags: string[];
}

export interface IPostModel
  extends Model<
    InferAttributes<IPostModel>,
    InferCreationAttributes<IPostModel>
  > {
  _id: CreationOptional<string>;
  type: PostTypeEnum;
  title: string;
  body: string;
  userId: string;
  status: PostStatusEnum;
  attachments?: string[];
  replyCount?: number;
  tags?: string[];
  isSolution?: boolean;
}
