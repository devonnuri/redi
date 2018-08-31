"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const firebase_admin_1 = require("firebase-admin");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
firebase_admin_1.initializeApp();
const routes_1 = require("./routes");
const app = express();
app.use(cors({
    origin: process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://redi-4d877.firebaseapp.com",
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes_1.default);
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map