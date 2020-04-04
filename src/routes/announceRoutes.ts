import BaseRouter from "./baseRouter";

import announceController from "../controller/announceController";
import { authRequired } from "../middleware/authMiddleware";

class AnnounceRoutes extends BaseRouter {
  routes(): void {
    this.router
      .route("/")
      .get(announceController.index)
      .post(authRequired, announceController.store);

    this.router
      .route("/:id")
      .patch(authRequired, announceController.update)
      .delete(authRequired, announceController.remove);
  }
}

export default new AnnounceRoutes().router;
