import {Router} from 'express';
import {Issue} from '../controllers/IssueController.js';

const router = Router({mergeParams: true});

router.post('/',Issue);

export default router;