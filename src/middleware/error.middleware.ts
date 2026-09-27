import type{ Request, Response, NextFunction } from "express";

export function errorHandler(
  error: Error & { code?: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  let statusCode = 500;

  // Bitcoin Core errors
  if (error.code === -5) {
    statusCode = 400; // Invalid address or key
  }

  if (error.code === -6) {
    statusCode = 400; // Insufficient funds
  }

  if (error.code === -18) {
    statusCode = 400; // No wallet loaded
  }

  res.status(statusCode).json({
    error: error.message,
    code: error.code
  });
}