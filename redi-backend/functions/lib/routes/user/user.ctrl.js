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
    const { id, name, age, password } = request.body;
    usersRef
        .where("id", "==", id)
        .get()
        .then((snapshot) => __awaiter(this, void 0, void 0, function* () {
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
            password: yield crypto_1.hash(password),
            age
        });
        response.sendStatus(200);
    }));
};
exports.login = (request, response) => {
    const { id, password } = request.body;
    usersRef
        .where("id", "==", id)
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
        response.cookie("access_token", yield token_1.generate({ id }));
        response.sendStatus(200);
    }));
};
exports.logout = (_, response) => {
    response.cookie("access_token", null);
    response.sendStatus(204);
};
exports.checkLogin = (request, response) => {
    response.status(200).json({
        name: request.id
    });
};
exports.getUser = (request, response) => {
    usersRef
        .where("id", "==", request.params.userId)
        .get()
        .then((snapshot) => __awaiter(this, void 0, void 0, function* () {
        if (!snapshot.empty) {
            response.status(404).json({
                name: "USER_NOT_FOUND",
                payload: request.params.userId
            });
            return;
        }
        response.json(snapshot.docs[0].data());
    }));
};
//# sourceMappingURL=user.ctrl.js.map