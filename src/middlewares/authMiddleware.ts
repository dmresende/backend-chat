import { NextFunction } from "express";
import { IUser } from "../models/User";

interface CustomRequest extends Request {
  user?: IUser | null;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {};
