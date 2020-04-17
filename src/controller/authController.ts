import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
import Security from "../utils/security";
const db = require("../db/models");

class AuthController {
  register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email && !req.body.password && !req.body.teacher_id) {
      return next(new HttpException("Please provide full information !", 400));
    }

    req.body.password = await Security.hashPasword(req.body.password);

    const data = await db.user.create(req.body);
    const user = data.dataValues;

    user.password = undefined;
    const token = Security.generateToken({ id: user.id, role: user.role });

    return res.status(201).json({
      status: "success",
      data: {
        token,
        ...user,
      },
    });
  });

  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email.toLowerCase();

    const data = await db.user.findOne({
      where: { email },
      attributes: { exclude: ["createdAt", "updatedAt", "teacherId"] },
      include: {
        model: db.teacher,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

    if (!data) return next(new HttpException("User not found or incorrect Password !", 401));

    const user = data.dataValues;
    const testPassword = await Security.comparePassword(req.body.password, user.password);

    if (!testPassword) {
      return next(new HttpException("User not found or incorrect Password !", 401));
    }

    user.password = undefined;
    const token = Security.generateToken({ id: user.id, role: user.role });

    return res.status(200).json({
      status: "success",
      data: {
        token,
        ...user,
      },
    });
  });

  setPin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, {
      pin: "required|digits:6",
    });

    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }

    const query = await db.user.findOne({ where: { id: req.user.id } });

    if (query.dataValues.pin) {
      return next(new HttpException("Pin already owned, please go to reset route !", 400));
    }

    const newPin = await Security.hashPasword(req.body.pin.toString());
    await db.user.update({ pin: newPin }, { where: { id: req.user.id } });

    res.status(201).json({
      status: "success",
      message: "pin sucessfull set",
    });
  });

  resetPin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, {
      password: "required",
      pin: "required|digits:6",
    });

    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }

    const query = await db.user.findOne({ where: { id: req.user.id } });
    if (!query) next(new HttpException("incorrect Password !", 401));
    const user = query.dataValues;

    const testPassword = await Security.comparePassword(req.body.password, user.password);
    if (!testPassword) next(new HttpException("incorrect Password !", 401));

    const newPin = await Security.hashPasword(req.body.pin.toString());
    await db.user.update({ pin: newPin }, { where: { id: req.user.id } });

    res.status(201).json({
      status: "success",
      message: "pin sucessfull changed",
    });
  });

  updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validation = new Validator(req.body, {
      oldPassword: "required",
      newPassword: "required",
      newPassword2: "required",
    });

    let { oldPassword, newPassword, newPassword2 } = req.body;

    if (validation.fails()) {
      return next(new HttpException("validation fail", 400, validation.errors));
    }
    if (newPassword !== newPassword2) {
      return next(new HttpException("please provide match password", 400));
    }

    const { dataValues: user } = await db.user.findOne({ where: { id: req.user.id } });
    const check = await Security.comparePassword(oldPassword, user.password);
    if (!check) return next(new HttpException("wrong password", 400));

    newPassword = await Security.hashPasword(newPassword);
    await db.user.update({ password: newPassword }, { where: { id: req.user.id } });

    res.status(201).json({
      status: "success",
      message: "password sucessfull changed",
    });
  });
}

export default new AuthController();
