import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';
import * as gcs from '@google-cloud/storage';
import * as Joi from 'joi';

import { validateSchema, guid } from '../../lib/common';

const postsRef = firestore().collection('posts');

const getLastPostId = (): Promise<number> => {
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

export const countPost = async (request: Request, response: Response) => {
  postsRef
    .get()
    .then(snapshot => {
      response.json({ count: snapshot.size });
    })
    .catch(() => {
      response.sendStatus(500);
    });
};

export const listPost = async (request: Request, response: Response) => {
  const { start, limit } = request.params;

  postsRef
    .where('id', '<=', (await getLastPostId()) - Number(start) + 1)
    .orderBy('id', request.params.reverse || 'asc')
    .limit(Number(limit))
    .get()
    .then(snapshot => {
      response.json(snapshot.docs.map(doc => doc.data()));
    })
    .catch(() => {
      response.sendStatus(500);
    });
};

export const readPost = async (request: Request, response: Response) => {
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
};

export const writePost = async (request: Request, response: Response) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .required()
      .min(1)
      .max(120),
    body: Joi.string()
      .required()
      .min(1),
  });

  if (!validateSchema(request, response, schema)) {
    return;
  }

  const { title, body } = request.body;

  const document = {
    id: (await getLastPostId()) + 1,
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
};

export const deletePost = async (request: Request, response: Response) => {
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
};

export const updatePost = async (request: Request, response: Response) => {
  const { postId } = request.params;
  const { title, body } = request.body;
  const id = await postsRef
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

  if (!id) return;

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
};
