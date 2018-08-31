"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCtrl = require("./auth.ctrl");
const authToken_1 = require("../../lib/middleware/authToken");
const Auth = express_1.Router();
Auth.post('/register', authCtrl.register);
Auth.post('/login', authCtrl.login);
Auth.post('/logout', authCtrl.logout);
Auth.post('/checklogin', authToken_1.default, authCtrl.checkLogin);
exports.default = Auth;
//# sourceMappingURL=index.js.map