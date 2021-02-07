import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) =>
  function asyncUtilWrap(...args: [Request, Response, NextFunction]) {
    const fnReturn = fn(...args);
    const next: any = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

export const notFound = (req: Request, res: Response, next: NextFunction) =>
  res.status(404).json({ message: "Not Found" });

export const serverError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status) {
    console.error(err.stack);
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};
