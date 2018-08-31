"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const crypto_1 = require("../../lib/crypto");
const token_1 = require("../../lib/token");
const usersRef = firebase_admin_1.firestore().collection("users");
exports.register = (request, response) => {
    const { username, password } = request.body;
    usersRef
        .where("username", "==", username)
        .get()
        .then((snapshot) => __awaiter(this, void 0, void 0, function* () {
        if (!snapshot.empty) {
            response.status(409).json({
                name: "DUPLICATED_ACCOUNT",
                payload: username
            });
            return;
        }
        usersRef.add({
            username,
            password: yield crypto_1.hash(password)
        });
        response.sendStatus(200);
    }));
};
exports.login = (request, response) => {
    const { username, password } = request.body;
    usersRef
        .where("username", "==", username)
        .get()
        .then((snapshot) => __awaiter(this, void 0, void 0, function* () {
        if (snapshot.empty) {
            response.status(400).json({
                name: "INVALID_CREDENTIALS"
            });
            return;
        }
        if (!crypto_1.check(snapshot.docs[0].data().password, password)) {
            response.status(400).json({
                name: "INVALID_CREDENTIALS"
            });
            return;
        }
        response.cookie("access_token", yield token_1.generate({ username }));
        response.sendStatus(200);
    }));
};
exports.logout = (_, response) => {
    response.cookie("access_token", null);
    response.sendStatus(204);
};
exports.checkLogin = (request, response) => {
    response.status(200).json({
        username: request.user
    });
};
//# sourceMappingURL=auth.ctrl.js.map