import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// common
import HttpException from "./utils/HttpException";
import GlobalError from "./middleware/globalError";

// router
import AuthRoutes from "./routes/authRouter";
import TeacherRoutes from "./routes/teacherRoutes";
import ClassRoomRoutes from "./routes/classRoomRoutes";
import hostelRoutes from "./routes/hostelRoutes";
import studentRoutes from "./routes/studentRoutes";
import permissionRoutes from "./routes/permissionRoutes";

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.plugins();
    this.routes();
    this.Handler404();
    this.HandlerError();
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.assets();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Typescript Express App");
    });

    this.app.use("/v1/auth", AuthRoutes);
    this.app.use("/v1/teacher", TeacherRoutes);
    this.app.use("/v1/classroom", ClassRoomRoutes);
    this.app.use("/v1/hostel", hostelRoutes);
    this.app.use("/v1/student", studentRoutes);
    this.app.use("/v1/permission", permissionRoutes);
  }

  protected Handler404(): void {
    this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new HttpException("Page not Found", 404));
    });
  }

  protected HandlerError(): void {
    this.app.use(GlobalError);
  }

  protected assets(): void {
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  public template(): void {
    this.app.set("view engine", "pug");
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App running on ${this.port} on Mode ${process.env.NODE_ENV}`);
    });
  }
}

export default App;
