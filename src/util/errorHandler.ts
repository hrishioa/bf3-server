import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default function handleExpressException(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  console.error('Unhandled error occurred - ', err);

  if (!res.headersSent) {
    if (err instanceof HttpException) {
      return res
        .status(err.status)
        .send({ success: false, status: err.status, message: err.message });
    } else if (err instanceof Error) {
      return res.status(500).send({ success: false, message: err.message });
    } else {
      return res.status(500).send({
        success: false,
        message:
          'An unexpected error occurred. Not helpful, I know, but thats all I have for now.',
      });
    }
  }
}