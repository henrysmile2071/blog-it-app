import express from 'express';

import registerRoute from './register.route.js';
import loginRoute from './login.route.js';
import postRoute from './post.route.js';

const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/posts', postRoute);

export default router;
