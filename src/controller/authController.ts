import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
// import HttpException from "../utils/HttpException";
const db = require("../db/models");

class AuthController {
  register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.user.create(req.body);

    return res.status(201).json({
      status: "success",
      data
    });
  });
}

export default new AuthController();
