"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCtrl = require("./user.ctrl");
const authToken_1 = require("../../lib/middleware/authToken");
const User = express_1.Router();
User.get("/:userId", authCtrl.getUser);
User.post("/register", authCtrl.register);
User.post("/login", authCtrl.login);
User.post("/logout", authCtrl.logout);
User.post("/checklogin", authToken_1.default, authCtrl.checkLogin);
exports.default = User;
//# sourceMappingURL=index.js.map