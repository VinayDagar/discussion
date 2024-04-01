import { JsonView } from "../response-view";
import { IUserInstance } from "../../db/models/types/user.type";
import { NextFunction } from "express";
import { createToken } from "../../utils/jwt-utility";
import { createHash } from "../../utils/encryptUtility";
// import { IErrorInstance } from "../../const";

export const createTokenAndReturn = async (user: IUserInstance, callback: NextFunction) => {
  try {
    const payload = {
      userId: user._id,
      type: "AUTH_TOKEN",
      meta: {
        "APP_NAME": "discussion"
      }
    };
    const token = createToken(payload);

    return JsonView({ token });

  } catch (err) {
    return callback(err);
  }
};

export const verifyPasswordAndReturn = async (user: IUserInstance, password: string, callback: NextFunction) => {
  try {

    const hashedPassword = createHash(user.salt, password);

    console.log(hashedPassword, user.password, password);
    
    if (user.password !== hashedPassword) {
      // const error: IErrorInstance = new Error('Invalid password!')
      // error.statusCode = 401;
      return false
    }


    const payload = {
      userId: user._id,
      type: "AUTH_TOKEN",
      meta: {
        "APP_NAME": "discussion"
      }
    };
    const token = createToken(payload);

    return JsonView({ token });

  } catch (err) {
    return callback(err);
  }
};