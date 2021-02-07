import { MikroORM } from "@mikro-orm/core";
import { IN_PROD } from "./config";
import { User } from "./models";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [User],
  dbName: "nodelogin",
  type: "postgresql",
  debug: IN_PROD,
} as Parameters<typeof MikroORM.init>[0];
