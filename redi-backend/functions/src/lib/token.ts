import * as jwt from "jsonwebtoken";

const { SECRET_KEY: secret } = process.env;

export const generate = (payload: any, options?: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        issuer: "devonnuri.com",
        expiresIn: "7d",
        ...options
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

export const decode = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
};
