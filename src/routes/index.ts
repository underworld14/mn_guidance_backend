import BaseRouter from "./baseRouter";

import authRouter from "./authRouter";
import teacherRoutes from "./teacherRoutes";
import classRoomRoutes from "./classRoomRoutes";
import hostelRoutes from "./hostelRoutes";
import studentRoutes from "./studentRoutes";
import permissionRoutes from "./permissionRoutes";
import announceRoutes from "./announceRoutes";

class Index extends BaseRouter {
  routes(): void {
    this.router.use("/auth", authRouter);
    this.router.use("/teacher", teacherRoutes);
    this.router.use("/classroom", classRoomRoutes);
    this.router.use("/hostel", hostelRoutes);
    this.router.use("/student", studentRoutes);
    this.router.use("/permission", permissionRoutes);
    this.router.use("/announcement", announceRoutes);
  }
}

export default new Index().router;
