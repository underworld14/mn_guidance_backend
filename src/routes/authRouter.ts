import BaseRouter from "./baseRouter";
import AuthController from "../controller/authController";
import { authRequired } from "../middleware/authMiddleware";
import { uploadImg } from "../utils/storage";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post("/register", AuthController.register);
    this.router.post("/login", AuthController.login);
    this.router.patch("/updatePassword", authRequired, AuthController.updatePassword);
    this.router.get("/getMe", authRequired, AuthController.getMe);
    this.router.patch(
      "/updateUser",
      authRequired,
      uploadImg,
      AuthController.processUsrImg,
      AuthController.updateUserInfo
    );
  }
}

export default new AuthRouter().router;
