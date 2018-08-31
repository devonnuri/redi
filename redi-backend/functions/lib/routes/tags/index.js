"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsCtrl = require("./tags.ctrl");
const authToken_1 = require("../../lib/middleware/authToken");
const Tags = express_1.Router();
Tags.get('/', postsCtrl.listTag);
Tags.post('/create', authToken_1.default, postsCtrl.createTag);
exports.default = Tags;
//# sourceMappingURL=index.js.map