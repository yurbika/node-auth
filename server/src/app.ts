import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import session, { Store } from "express-session";
import { SESSION_OPTIONS } from "./config";
import { RequestContext } from "@mikro-orm/core";
import DI from ".";
import { notFound, serverError } from "./middleware/error";
import { home, login, logout, register } from "./routes";

const createApp = (store: Store) => {
  const app = express();

  //middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (DI && DI.orm) {
      RequestContext.create(DI.orm.em, next);
      req.DI = DI;
    } else next();
  });
  app.use(compression());
  app.use(express.json());
  app.use(session({ ...SESSION_OPTIONS, store }));

  //routes
  app.use(home);
  app.use(login);
  app.use(logout);
  app.use(register);

  //error handling
  app.use(notFound);
  app.use(serverError);

  return app;
};

export default createApp;
