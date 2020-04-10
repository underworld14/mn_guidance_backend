import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
const db = require("../db/models");

class HostelController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.hostel.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: db.teacher,
          attributes: ["id", "name"],
        },
        {
          model: db.room,
          attributes: ["id", "hostel_id", "name"],
        },
      ],
    });

    let results: any = [];

    await Promise.all(
      data.map(async (val: any, i: number) => {
        let total = await db.student.count({
          include: { model: db.room, where: { hostel_id: val.dataValues.id } },
        });
        let res = { ...data[i].dataValues, totalStudents: total };
        results.push(res);
      })
    );

    res.status(200).json({
      status: "success",
      result: results.length,
      data: results,
    });
  });

  show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const hostel = await db.hostel.findOne({
      where: { id: req.params.id },
      attributes: ["id", "name"],
      include: [
        {
          model: db.teacher,
          attributes: ["id", "name"],
        },
        {
          model: db.room,
          attributes: ["id", "name"],
        },
      ],
    });

    const students = await db.student.findAll({
      attributes: ["id", "name", "district"],
      include: [
        {
          model: db.room,
          where: { hostel_id: req.params.id },
          attributes: ["id", "name"],
        },
        {
          model: db.classroom,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        hostel,
        students: {
          total: students.length,
          students,
        },
      },
    });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, {
      teacher_id: "required|numeric",
      name: "required",
    });

    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }

    const data = await db.hostel.create(req.body);
    res.status(200).json({
      status: "success",
      data,
    });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.hostel.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({
      status: "success",
      message: "Data sucessfull updated !",
    });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.hostel.destroy({ where: { id: req.params.id } });
    res.status(201).json({
      status: "success",
      message: "Data sucessfull deleted !",
    });
  });
}

export default new HostelController();
