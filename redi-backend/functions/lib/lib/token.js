"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { SECRET_KEY: secret } = process.env;
exports.generate = (payload, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, Object.assign({ issuer: "devonnuri.com", expiresIn: "7d" }, options), (error, token) => {
            if (error)
                reject(error);
            resolve(token);
        });
    });
};
exports.decode = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error)
                reject(error);
            resolve(decoded);
        });
    });
};
//# sourceMappingURL=token.js.map