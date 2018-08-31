"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsCtrl = require("./posts.ctrl");
const authToken_1 = require("../../lib/middleware/authToken");
const Posts = express_1.Router();
Posts.get("/count", postsCtrl.countPost);
Posts.get("/:start/:limit/:reverse", postsCtrl.listPost);
Posts.get("/:start/:limit", postsCtrl.listPost);
Posts.get("/:postId", postsCtrl.readPost);
Posts.post("/write", authToken_1.default, postsCtrl.writePost);
Posts.post("/delete/:postId", authToken_1.default, postsCtrl.deletePost);
Posts.post("/update/:postId", authToken_1.default, postsCtrl.updatePost);
exports.default = Posts;
//# sourceMappingURL=index.js.map