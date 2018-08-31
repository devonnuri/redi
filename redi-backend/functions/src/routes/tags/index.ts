import { Router } from 'express';

import * as postsCtrl from './tags.ctrl';
import authToken from '../../lib/middleware/authToken';

const Tags = Router();

Tags.get('/', postsCtrl.listTag);
Tags.post('/create', authToken, postsCtrl.createTag);

export default Tags;
