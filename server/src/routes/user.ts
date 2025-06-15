// get user related details like 
// total progress
// problems marked as done
// problems marled as revision
import express, { NextFunction, Request, Response } from "express";
import { UsersController } from '../controllers/users.controller';
import currentUser from '../middlewares/currentUser';
import logger from '../utils/logger';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`User Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
});

router.use(currentUser);

router.get('/user/progress', UsersController.getUserProgress);

router.post('/user/mark', UsersController.markProblem);

router.post('/users/revision', UsersController.tbd);

router.post('/users/notes', UsersController.tbd);

export default router;
