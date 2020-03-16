import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
// import HttpException from "../utils/HttpException";
const db = require("../db/models");

class AuthController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.teacher.findAll();

    res.status(200).json({
      status: "success",
      data
    });
  });
}

export default new AuthController();
