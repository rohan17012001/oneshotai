import {Router} from 'express';

import {Login,Register} from '../controllers/LoginController.js';

const router = Router({mergeParams: true});

router.get('/',Login);
router.post('/',Register);

export default router;