import { Request, Response } from 'express';
import * as Joi from 'joi';

export const validateSchema = (request: Request, response: Response, schema: any) => {
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });

    return false;
  }
  return true;
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const guid = () => {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};
