import {Router} from 'express';
import {Return} from '../controllers/IssueController.js';
const router = Router({mergeParams: true});


router.post('/', Return);

export default router;