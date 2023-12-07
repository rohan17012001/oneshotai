import {Router} from 'express';
import Login from './Login.js';
import Issue from './Issue.js';
import Return from './Return.js';

const router = Router({mergeParams: true});

router.use('/login',Login);
router.use('/issue',Issue);
router.use('/return',Return);

export default router;
