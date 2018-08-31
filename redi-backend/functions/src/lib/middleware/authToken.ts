import { Request, Response } from "../express";
import { decode } from "../token";

export default async (request: Request, response: Response, next: Function) => {
  const token = request.cookies["access_token"];

  if (!token) {
    request.id = null;
    response.sendStatus(401);
    return;
  }

  try {
    const decoded: any = await decode(token);
    const { id, exp } = decoded;

    request.id = id;
    request.tokenExpire = new Date(exp * 1000);
    next();
  } catch (e) {
    request.id = null;
    response.sendStatus(401);
  }
};
