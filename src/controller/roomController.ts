import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
const db = require("../db/models");

class RoomController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.hostelId) filter = { where: { hostel_id: req.params.hostelId } };

    const data = await db.room.findAll(filter);
    res.status(200).json({
      status: "success",
      result: data.length,
      data
    });
  });

  show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.room.findOne({
      where: { id: req.params.id }
    });
    res.status(200).json({
      status: "success",
      data
    });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    req.body.hostel_id = req.params.hostelId || req.body.teacher_id;
    const validation = new Validator(req.body, {
      hostel_id: "required|numeric",
      name: "required"
    });
    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }

    const data = await db.room.create(req.body);

    res.status(200).json({
      status: "success",
      data
    });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.room.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({
      status: "success",
      message: "Data sucessfull updated !"
    });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.room.destroy({ where: { id: req.params.id } });
    res.status(201).json({
      status: "success",
      message: "Data sucessfull deleted !"
    });
  });
}

export default new RoomController();
