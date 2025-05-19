import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

interface HttpError extends Error {
  statusCode?: number;
  errors?: unknown[];
}

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
  });
}