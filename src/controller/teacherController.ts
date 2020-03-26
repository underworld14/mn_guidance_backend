import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import catchAsync from "../utils/catchAsync";
import HttpException from "../utils/HttpException";
const db = require("../db/models");

class TeacherController {
  index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await db.teacher.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.classroom,
          attributes: ["id", "name", "place"]
        }
      ]
    });

    res.status(200).json({
      status: "success",
      data
    });
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
      message: "data sucessfull updated"
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
}

export default new TeacherController();
