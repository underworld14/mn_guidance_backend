// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import TeacherController from "../controller/teacherController";

class TeacherRoutes extends BaseRouter {
  routes(): void {
    this.router.get("/", TeacherController.index);
  }
}

export default new TeacherRoutes().router;
