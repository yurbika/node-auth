import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";
import createApp from "./app";
import { APP_PORT, REDIS_OPTIONS } from "./config";

//orm
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

interface DII {
  orm?: MikroORM<IDatabaseDriver<Connection>>;
  em?: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
}

const DI: DII = {};
export default DI;

(async () => {
  const RedisStore = connectRedis(session);
  const client = new Redis(REDIS_OPTIONS);
  const store = new RedisStore({ client, disableTouch: true });

  //orm
  DI.orm = await MikroORM.init(microConfig);
  DI.em = DI.orm.em;
  DI.orm.getMigrator().up();

  const app = createApp(store);

  app.listen(APP_PORT, () => {
    console.log("http://localhost:" + APP_PORT);
  });
})().catch((err) => console.error(err));
