"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const posts_1 = require("./posts");
const tags_1 = require("./tags");
const router = express_1.Router();
router.use("/user", user_1.default);
router.use("/posts", posts_1.default);
router.use("/tags", tags_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map