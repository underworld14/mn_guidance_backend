// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import hostelController from "../controller/hostelController";
// import roomController from "../controller/roomController";
import roomRoutes from "./roomRoutes";

class HostelRouter extends BaseRouter {
  routes(): void {
    this.router.use("/:hostelId/room", roomRoutes);

    this.router
      .route("/")
      .get(hostelController.index)
      .post(hostelController.store);

    this.router
      .route("/:id")
      .get(hostelController.show)
      .patch(hostelController.update)
      .delete(hostelController.remove);

    // this.router
    //   .route("/:hostelId/room")
    //   .get(roomController.index)
    //   .post(roomController.store);
  }
}

export default new HostelRouter().router;
