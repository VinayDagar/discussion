import { JsonView } from "../response-view";
import { RequestInstance } from "const";
import { NextFunction, Response } from "express";

exports.getLoggedInUserController = async (req: RequestInstance, res: Response, next: NextFunction) => {
  return res.json(JsonView(req.user))
};