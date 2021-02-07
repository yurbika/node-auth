declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      REDIS_PORT: string;
      REDIS_HOST: string;
      REDIS_PASSWORD: string;
      APP_PORT: string;
    }
  }
}

export {};
