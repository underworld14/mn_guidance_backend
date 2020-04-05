import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
import { paginate } from "../utils/api";
const { Op } = require("sequelize");
const db = require("../db/models");

class StudentController {
  private validateRules = {
    class_id: "numeric",
    room_id: "numeric",
    nis: "numeric",
    address: "min:6",
    phone: "min:10",
    birthdate: "date",
  };

  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query: Object = {
      attributes: ["id", "nis", "name", "district"],
      include: [
        {
          model: db.classroom,
          attributes: ["id", "name"],
        },
        {
          model: db.room,
          attributes: ["id", "name"],
          include: {
            model: db.hostel,
            attributes: ["id", "name"],
          },
        },
      ],
      order: [
        [db.classroom, "name", "ASC"],
        ["name", "ASC"],
      ],
    };

    if (req.query.search) {
      query = {
        where: {
          name: { [Op.like]: `%${req.query.search}%` },
        },
        ...query,
      };
    }

    if (req.query.page && req.query.pageSize) {
      query = paginate(query, Number(req.query.page), Number(req.query.pageSize));
    }

    const { count, rows } = await db.student.findAndCountAll(query);

    res.status(200).json({
      status: "success",
      total: count,
      data: rows,
    });
  });

  show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.student.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.classroom,
          attributes: ["id", "name"],
          include: {
            model: db.teacher,
            attributes: ["id", "name"],
          },
        },
        {
          model: db.room,
          attributes: ["id", "name"],
          include: {
            model: db.hostel,
            attributes: ["id", "name"],
            include: {
              model: db.teacher,
              attributes: ["id", "name"],
            },
          },
        },
      ],
    });

    if (!data) return next(new HttpException("Data not found", 400));

    res.status(200).json({
      status: "success",
      data: data,
    });
  });

  store = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let validate = new Validator(req.body, this.validateRules);

    if (validate.fails()) {
      return next(new HttpException("validation error", 400, validate.errors));
    }

    const data = await db.student.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Data Successfull written",
      data: data,
    });
  });

  update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let validate = new Validator(req.body, this.validateRules);

    if (validate.fails()) {
      return next(new HttpException("validation error", 400, validate.errors));
    }

    await db.student.update(req.body, { where: { id: req.params.id } });

    res.status(201).json({
      status: "success",
      message: "Data Successfull updated",
    });
  });

  remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await db.student.destroy({ where: { id: req.params.id } });

    res.status(201).json({
      status: "success",
      message: "Data Successfull deleted",
    });
  });
}

export default new StudentController();
