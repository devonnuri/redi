import { Request, Response } from "../../lib/express";
import { firestore } from "firebase-admin";
import { hash, check } from "../../lib/crypto";
import { generate } from "../../lib/token";

const usersRef = firestore().collection("users");

export const register = (request: Request, response: Response) => {
  const { id, name, age, password } = request.body;

  usersRef
    .where("id", "==", id)
    .get()
    .then(async snapshot => {
      if (!snapshot.empty) {
        response.status(409).json({
          name: "DUPLICATED_ACCOUNT",
          payload: id
        });
        return;
      }

      usersRef.add({
        id,
        name,
        password: await hash(password),
        age
      });

      response.sendStatus(200);
    });
};

export const login = (request: Request, response: Response) => {
  const { id, password } = request.body;

  usersRef
    .where("id", "==", id)
    .get()
    .then(async snapshot => {
      if (snapshot.empty) {
        response.status(400).json({
          name: "INVALID_CREDENTIALS"
        });
        return;
      }

      if (!check(snapshot.docs[0].data().password, password)) {
        response.status(400).json({
          name: "INVALID_CREDENTIALS"
        });
        return;
      }

      response.cookie("access_token", await generate({ id }));

      response.sendStatus(200);
    });
};

export const logout = (_: Request, response: Response) => {
  response.cookie("access_token", null);
  response.sendStatus(204);
};

export const checkLogin = (request: Request, response: Response) => {
  response.status(200).json({
    name: request.id
  });
};

export const getUser = (request: Request, response: Response) => {
  usersRef
    .where("id", "==", request.params.userId)
    .get()
    .then(async snapshot => {
      if (!snapshot.empty) {
        response.status(404).json({
          name: "USER_NOT_FOUND",
          payload: request.params.userId
        });
        return;
      }

      response.json(snapshot.docs[0].data());
    });
};
