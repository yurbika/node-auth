import { NextFunction, Request, Response } from "express";
import { isLoggedIn, logOut } from "../util";
import { SESSION_ABSOLUTE_TIMEOUT } from "../config";
import { BadRequest, Unauthorized } from "../errors";
import { catchAsync } from "./error";

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest("You are already logged in"));
  }

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized("You must be logged in"));
  }

  next();
};

//session timeout
export const active = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
      const now = Date.now();
      const { createdAt }: any = req.session;

      if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
        await logOut(req, res);
        return next(new Unauthorized("Session expired"));
      }
    }

    next();
  }
);
