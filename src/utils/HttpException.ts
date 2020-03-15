class HttpException extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  detail: any;

  constructor(message: string, statusCode: number, detail?: any) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${this.statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
    this.detail = detail;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpException;
