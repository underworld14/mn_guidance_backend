import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
// const Sequelize = require("sequelize");
const db = require("../db/models");

class ClassController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.classroom.findAll({
      attributes: ["id", "name", "place"],
      include: [
        {
          model: db.teacher,
          attributes: ["id", "name", "room"],
        },
      ],
    });

    let newData: any = [];

    await Promise.all(
      data.map(async (val: any, i: number) => {
        let result = await db.student.count({ where: { class_id: val.dataValues.id } });
        let total = { ...data[i].dataValues, total: result };
        newData.push(total);
      })
    );

    res.status(200).json({
      status: "success",
      result: newData.length,
      data: newData,
    });
  });

  show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.classroom.findOne({
      where: { id: req.params.id },
      order: [["students", "room_id", "ASC"]],
      include: [
        {
          model: db.teacher,
        },
        {
          model: db.student,
        },
      ],
    });

    const results = data.dataValues;

    res.status(200).json({
      status: "success",
      data: {
        total: results.students.length,
        ...results,
      },
    });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, {
      teacher_id: "required|numeric",
      name: "required",
      place: "required",
    });

    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }

    const data = await db.classroom.create(req.body);

    res.status(200).json({
      status: "success",
      data,
    });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.classroom.update(req.body, { where: { id: req.params.id } });

    res.status(201).json({
      status: "success",
      message: "Data sucessfull updated !",
    });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.classroom.destroy({ where: { id: req.params.id } });

    res.status(201).json({
      status: "success",
      message: "Data sucessfull deleted !",
    });
  });
}

export default new ClassController();
