import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
// import HttpException from "../utils/HttpException";
const db = require("../db/models");

class AnnouncementController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.announcement.findAll();

    res.status(200).json({
      status: "success",
      data,
    });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    req.body.user_id = req.user.id;
    const data = await db.announcement.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Data Successfull written",
      data,
    });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.announcement.update(req.body, { where: { id: req.params.id } });

    res.status(201).json({
      status: "success",
      message: "Data Successfull updated",
    });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.announcement.destroy({ where: { id: req.params.id } });

    res.status(201).json({
      status: "success",
      message: "Data Successfull deleted",
    });
  });
}

export default new AnnouncementController();
