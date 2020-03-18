import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
const db = require("../db/models");

class RoomController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.room.findAll({
      attributes: { exclude: ["hostel_id", "hostelId", "createdAt", "updatedAt"] },
      include: [
        {
          model: db.hostel,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }
      ]
    });

    res.status(200).json({
      status: "success",
      result: data.length,
      data
    });
  });

  show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const data = await db.classroom.findOne({
    //   where: { id: req.params.id },
    //   include: [
    //     {
    //       model: db.teacher
    //     }
    //   ]
    // });
    // res.status(200).json({
    //   status: "success",
    //   data
    // });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const validation = new Validator(req.body, {
    //   teacher_id: "required|numeric",
    //   name: "required",
    //   place: "required"
    // });
    // if (validation.fails()) {
    //   return next(new HttpException("validation fail", 400, validation.errors));
    // }
    // const data = await db.classroom.create(req.body);
    // res.status(200).json({
    //   status: "success",
    //   data
    // });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //   await db.classroom.update(req.body, { where: { id: req.params.id } });
    //   res.status(201).json({
    //     status: "success",
    //     message: "Data sucessfull updated !"
    //   });
    // });
    // remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //   await db.classroom.destroy({ where: { id: req.params.id } });
    //   res.status(201).json({
    //     status: "success",
    //     message: "Data sucessfull deleted !"
    //   });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // await db.classroom.destroy({ where: { id: req.params.id } });
    // res.status(201).json({
    //   status: "success",
    //   message: "Data sucessfull deleted !"
    // });
  });
}

export default new RoomController();
