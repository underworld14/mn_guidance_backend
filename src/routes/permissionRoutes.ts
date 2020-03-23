// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";
import permissionController from "../controller/permissionController";

import { authRequired, restrictTo } from "../middleware/authMiddleware";

class StudentRoutes extends BaseRouter {
  routes(): void {
    this.router.get("/", permissionController.getAllPermission);
    this.router.get("/letter/:id", authRequired, permissionController.getPermissionLetter);

    this.router.post("/apply", authRequired, permissionController.applyPermission);
    this.router.post(
      "/accept/:id",
      authRequired,
      restrictTo("supervisor"),
      permissionController.acceptPermission
    );

    this.router.patch("/complete/:id", authRequired, permissionController.completePermission);
  }
}

export default new StudentRoutes().router;
