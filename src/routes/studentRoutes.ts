// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";
import studentController from "../controller/studentController";

class StudentRoutes extends BaseRouter {
  routes(): void {
    this.router
      .route("/")
      .get(studentController.index)
      .post(studentController.store);

    this.router
      .route("/:id")
      .get(studentController.show)
      .patch(studentController.update)
      .delete(studentController.remove);
  }
}

export default new StudentRoutes().router;
