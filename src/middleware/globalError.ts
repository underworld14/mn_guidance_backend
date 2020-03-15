import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

function GlobalError(err: HttpException, req: Request, res: Response, next: NextFunction) {
  const code: number = err.statusCode ? err.statusCode : 500;
  const status: string = err.status ? err.status : "error";

  if (process.env.NODE_ENV === "development") {
    return res.status(code).json({
      status: status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  }

  if (err.isOperational) {
    return res.status(code).json({
      status: status,
      message: err.message,
      err: err
    });
  }

  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "something went very wrong"
  });
}

export default GlobalError;
