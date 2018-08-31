import { Request as IRequest, Response as IResponse } from "express";

export interface Request extends IRequest {
  id: any;
  tokenExpire: Date;
}

export interface Response extends IResponse {}
