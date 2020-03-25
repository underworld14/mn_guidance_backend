// import { Request, Response } from "express";
import BaseRouter from "./baseRouter";

// controller
import AuthController from "../controller/authController";

// middleware
import { authRequired } from "../middleware/authMiddleware";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post("/register", AuthController.register);
    this.router.post("/login", AuthController.login);
    this.router.post("/setpin", authRequired, AuthController.setPin);
    this.router.patch("/resetpin", authRequired, AuthController.resetPin);
  }
}

export default new AuthRouter().router;
