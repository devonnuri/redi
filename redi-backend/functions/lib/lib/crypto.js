"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.hash = (plain) => {
    return bcrypt.genSalt(saltRounds).then(salt => {
        return bcrypt.hash(plain, salt);
    });
};
exports.check = (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};
//# sourceMappingURL=crypto.js.map