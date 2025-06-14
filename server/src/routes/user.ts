// get user related details like 
// total progress
// problems marked as done
// problems marled as revision
import express from 'express';
import { UsersController } from '../controllers/users.controller';

const router = express.Router();

router.post('/user/progress', UsersController.getUserProgress);

router.post('/user/mark', UsersController.markProblem);

router.post('/users/revision', UsersController.tbd);

// router.get('/user', UsersController.tbd);

export default router;
