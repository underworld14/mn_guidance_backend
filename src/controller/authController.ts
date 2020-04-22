import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import sharp from "sharp";
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
      access_token: token,
      data: user,
    });
  });

  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email.toLowerCase();

    const data = await db.user.findOne({
      where: { email },
      include: { model: db.teacher },
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
      access_token: token,
      data: user,
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

  getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.user.findOne({
      where: { id: req.user.id },
      include: { model: db.teacher },
    });

    data.dataValues.password = undefined;

    if (!data) return next(new HttpException("User not found or incorrect Password !", 401));

    return res.status(200).json({
      status: "success",
      data,
    });
  });

  processUsrImg = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/${req.file.filename}`);

    next();
  });

  updateUserInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await db.user.findOne({ where: { id: req.user.id } });
    if (!user) return next(new HttpException("user not found", 400));

    if (req.file) {
      const photoUrl = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
      req.body.photo = photoUrl;
    }
    await db.teacher.update(req.body, { where: { id: user.dataValues.teacher_id } });

    res.status(201).json({
      status: "success",
      message: "data sucessfull updated",
    });
  });
}

export default new AuthController();
