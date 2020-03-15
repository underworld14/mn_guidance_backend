import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import HttpException from "../utils/HttpException";
const db = require("../db/models");

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpException("Validation Error", 401, errors.array()));
    }

    next();
  };
};

export const registerValidate = validate([
  check("email")
    .isEmail()
    .custom(async value => {
      const user = await db.user.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject("Email already in use !");
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password minimum character is 6")
    .matches(/\d/)
    .withMessage("password must contain a number"),
  check("username")
    .isLength({ min: 5 })
    .withMessage("username minimum character is 5")
]);
