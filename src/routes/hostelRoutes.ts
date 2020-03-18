// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import hostelController from "../controller/hostelController";

class HostelRouter extends BaseRouter {
  routes(): void {
    this.router
      .route("/")
      .get(hostelController.index)
      .post(hostelController.store);

    this.router
      .route("/:id")
      .get(hostelController.show)
      .patch(hostelController.update)
      .delete(hostelController.remove);
  }
}

export default new HostelRouter().router;
