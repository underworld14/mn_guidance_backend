// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import roomController from "../controller/roomController";

class RoomRoutes extends BaseRouter {
  routes(): void {
    this.router.route("/").get(roomController.index);
    // .post(roomController.store);

    // this.router.route("/:id");
    // // .get(roomController.show)
    // // .patch(roomController.update)
    // // .delete(roomController.remove);
  }
}

export default new RoomRoutes().router;
