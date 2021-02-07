declare namespace Express {
  export interface Request {
    DI?: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
  }
}
