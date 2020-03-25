// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import TeacherController from "../controller/teacherController";
import storage from "../utils/storage";

class TeacherRoutes extends BaseRouter {
  routes(): void {
    this.router.get("/", TeacherController.index);

    this.router.patch(
      "/user/:id",
      storage.uploadImg,
      TeacherController.processUsrImg,
      TeacherController.updateUserInfo
    );
  }
}

export default new TeacherRoutes().router;
