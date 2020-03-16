import { Request, Response, NextFunction } from "express";
import jwt from "express-jwt";
import HttpException from "../utils/HttpException";

export const authRequired = jwt({ secret: "my-secret-key" });

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new HttpException("You are not authenticated to perform this action", 401));
    }
    next();
  };
};
