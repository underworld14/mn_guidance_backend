import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

import AuthController from "../controller/authController";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Hello auth router");
    });

    this.router.post("/register", AuthController.register);

    this.router.post("/login", (req: Request, res: Response) => {
      res.send("login router");
    });
  }
}

export default new AuthRouter().router;
