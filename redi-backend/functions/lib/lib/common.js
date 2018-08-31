"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.validateSchema = (request, response, schema) => {
    const result = Joi.validate(request.body, schema);
    if (result.error) {
        response.status(400).json({
            name: 'WRONG_SCHEMA',
            payload: result.error,
        });
        return false;
    }
    return true;
};
const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};
exports.guid = () => {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};
//# sourceMappingURL=common.js.map