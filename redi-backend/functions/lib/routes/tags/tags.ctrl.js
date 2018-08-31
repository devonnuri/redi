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
const Joi = require("joi");
const common_1 = require("../../lib/common");
const tagsRef = firebase_admin_1.firestore().collection('tags');
exports.createTag = (request, response) => __awaiter(this, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        name: Joi.string()
            .required()
            .min(1)
            .max(50),
    });
    if (!common_1.validateSchema(request, response, schema)) {
        return;
    }
    const { name } = request.body;
    tagsRef.add({ name });
    response.json({ name });
});
exports.listTag = (request, response) => __awaiter(this, void 0, void 0, function* () {
    tagsRef
        .get()
        .then(snapshot => {
        response.json(snapshot.docs.map(doc => doc.data()));
    })
        .catch(() => {
        response.sendStatus(500);
    });
});
//# sourceMappingURL=tags.ctrl.js.map