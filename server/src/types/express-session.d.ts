import { DateType } from "@mikro-orm/core";
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    userId?: number | string;
    createdAt?: number;
  }
}
