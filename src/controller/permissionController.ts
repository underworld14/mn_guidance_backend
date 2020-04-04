import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
import Security from "../utils/security";
// import { paginate } from "../utils/api";
const { Op } = require("sequelize");
const db = require("../db/models");

class PermissionController {
  private validateRules = {
    student_id: "required|numeric",
    type: "required",
    time_begin: "required|date",
    time_end: "required|date",
    month: "required|numeric",
    reason: "required",
    destination: "required",
    pin: "digits:6"
  };

  private permissionType = {
    home: "gohome",
    outside: "gooutside",
    treatment: "gotreatment",
    other: "other"
  };

  private PermissionStatus = {
    apply: "APPLYING",
    reject: "REJECTED",
    progress: "ON PROGRESS",
    finish: "FINISHED",
    late: "LATE"
  };

  getAllPermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // both admin and supervisor (pending permission || on progress );
    const data = await db.permission.findAll({
      where: {
        [Op.or]: [
          { status: this.PermissionStatus.apply },
          { status: this.PermissionStatus.progress }
        ]
      },
      include: [
        {
          model: db.student,
          attributes: ["id", "name"]
        },
        {
          model: db.user,
          attributes: ["id"],
          include: {
            model: db.teacher,
            attributes: ["name"]
          }
        }
      ],
      order: [["id", "DESC"]]
    });

    res.status(200).json({
      status: "success",
      results: data.length,
      data
    });
  });

  applyPermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let validation = new Validator(req.body, this.validateRules);
    if (validation.fails()) {
      return next(new HttpException("validation error", 400, validation.errors));
    }

    // user input the pin to request, if correct agree..
    const user = await db.user.findOne({ where: { id: req.user.id } });
    const testPin = await Security.comparePassword(req.body.pin, user.dataValues.pin);
    if (!testPin) return next(new HttpException("incorrect pin", 401));

    // if supervisor give grant access to ACCEPTED if admin give the apply
    if (req.user.role === "supervisor") {
      req.body.status = this.PermissionStatus.progress;
    }

    // if admin give optional status
    if (req.user.role === "admin") {
      req.body.status = this.PermissionStatus.progress;

      if (req.body.type === this.permissionType.home) {
        req.body.status = this.PermissionStatus.apply;
      }
    }

    // input data and user credentials database
    req.body.user_id = req.user.id;
    const data = await db.permission.create(req.body);

    // response the input data..... and wait to admin to be confirmed
    res.status(201).json({
      status: "success",
      message: "Permission created",
      data
    });
  });

  acceptPermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // supervisor setpin if correct continue progress
    const supervisor = await db.user.findOne({ where: { id: req.user.id } });
    const testPin = await Security.comparePassword(req.body.pin, supervisor.dataValues.pin);
    if (!testPin) return next(new HttpException("incorrect pin !", 401));

    if (req.body.status === "accept") {
      req.body.status = this.PermissionStatus.progress;
    } else if (req.body.status === "reject") {
      req.body.status = this.PermissionStatus.reject;
    }

    // find permission by permission id and update it to the accepted or rejected
    await db.permission.update(
      { status: req.body.status },
      {
        where: { id: req.params.id }
      }
    );

    // send action status to the client
    res.status(201).json({
      status: "success",
      message: "Permission confirmed"
    });
  });

  getPermissionLetter = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // find permission by id and check if status is accepted
    const data = await db.permission.findOne({ where: { id: req.params.id } });
    if (data.dataValues.status !== this.PermissionStatus.progress) {
      return next(new HttpException("permission un-accepted", 401));
    }

    // generate complete url permission link && generate token permission
    const url = `${req.protocol}://${req.get("host")}/v1/permission/complete/${data.dataValues.id}`;

    // send information to the client
    res.status(200).json({
      status: "success",
      data: {
        url,
        ...data.dataValues
      }
    });
  });

  completePermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check user pin, if correct allow user to perform action
    const user = await db.user.findOne({ where: { id: req.user.id } });
    const testPin = await Security.comparePassword(req.body.pin, user.dataValues.pin);
    if (!testPin) {
      return next(new HttpException("incorrect pin", 401));
    }

    // find permission by id update status permission to finish
    await db.permission.update(
      { status: this.PermissionStatus.finish },
      { where: { id: req.params.id } }
    );

    // send information to the client
    res.status(201).json({
      status: "success",
      message: "Permission have ben completed"
    });
  });

  violatingPermission = catchAsync;
}

export default new PermissionController();
