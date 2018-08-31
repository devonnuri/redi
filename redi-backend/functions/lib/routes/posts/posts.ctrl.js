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
const postsRef = firebase_admin_1.firestore().collection('posts');
const getLastPostId = () => {
    return postsRef
        .orderBy('id', 'desc')
        .limit(1)
        .get()
        .then(snapshot => {
        if (snapshot.empty) {
            return 0;
        }
        return snapshot.docs[0].data().id;
    });
};
exports.countPost = (request, response) => __awaiter(this, void 0, void 0, function* () {
    postsRef
        .get()
        .then(snapshot => {
        response.json({ count: snapshot.size });
    })
        .catch(() => {
        response.sendStatus(500);
    });
});
exports.listPost = (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { start, limit } = request.params;
    postsRef
        .where('id', '<=', (yield getLastPostId()) - Number(start) + 1)
        .orderBy('id', request.params.reverse || 'asc')
        .limit(Number(limit))
        .get()
        .then(snapshot => {
        response.json(snapshot.docs.map(doc => doc.data()));
    })
        .catch(() => {
        response.sendStatus(500);
    });
});
exports.readPost = (request, response) => __awaiter(this, void 0, void 0, function* () {
    postsRef
        .where('id', '==', Number(request.params.postId))
        .get()
        .then(snapshot => {
        if (snapshot.empty) {
            response.status(404).json({
                name: 'POST_NOT_FOUND',
            });
            return;
        }
        response.json(snapshot.docs[0].data());
    })
        .catch(() => {
        response.sendStatus(500);
    });
});
exports.writePost = (request, response) => __awaiter(this, void 0, void 0, function* () {
    const schema = Joi.object().keys({
        title: Joi.string()
            .required()
            .min(1)
            .max(120),
        body: Joi.string()
            .required()
            .min(1),
    });
    if (!common_1.validateSchema(request, response, schema)) {
        return;
    }
    const { title, body } = request.body;
    const document = {
        id: (yield getLastPostId()) + 1,
        title,
        body,
        createdAt: new Date(),
    };
    postsRef
        .add(document)
        .then(() => {
        response.json(document);
    })
        .catch(() => {
        response.sendStatus(500);
    });
});
exports.deletePost = (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { postId } = request.params;
    postsRef
        .where('id', '==', Number(postId))
        .get()
        .then(snapshot => {
        if (snapshot.empty) {
            response.status(404).json({
                name: 'POST_NOT_FOUND',
            });
        }
        snapshot.docs[0].ref.delete();
    });
});
exports.updatePost = (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { postId } = request.params;
    const { title, body } = request.body;
    const id = yield postsRef
        .where('id', '==', Number(postId))
        .get()
        .then(snapshot => {
        if (snapshot.empty) {
            response.status(404).json({
                name: 'POST_NOT_FOUND',
            });
            return null;
        }
        return snapshot.docs[0].id;
    });
    if (!id)
        return;
    const document = {
        id: Number(postId),
        title,
        body,
        date: new Date(),
    };
    postsRef
        .doc(id)
        .update(document)
        .then(() => {
        response.json(document);
    })
        .catch(() => {
        response.sendStatus(500);
    });
});
//# sourceMappingURL=posts.ctrl.js.map