import * as functions from "firebase-functions";
import * as express from "express";
import { initializeApp } from "firebase-admin";
import { config } from "dotenv";

config();

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

initializeApp();

import Router from "./routes";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://redi-4d877.firebaseapp.com",
    optionsSuccessStatus: 200,
    credentials: true
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", Router);

export const api = functions.https.onRequest(app);
