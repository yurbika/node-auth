import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";

const HALF_HOUR = 1000 * 60 * 30;

const SIX_HOURS = 1000 * 60 * 60 * 6;

export const SESSION_ABSOLUTE_TIMEOUT = +(
  process.env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS
);

export const {
  SESSION_SECRET,
  SESSION_NAME = "sid",
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
    httpOnly: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
