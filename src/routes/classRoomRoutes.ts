// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import classController from "../controller/classController";

class ClassRoom extends BaseRouter {
  routes(): void {
    this.router
      .route("/")
      .get(classController.index)
      .post(classController.store);

    this.router
      .route("/:id")
      .get(classController.show)
      .patch(classController.update)
      .delete(classController.remove);
  }
}

export default new ClassRoom().router;
