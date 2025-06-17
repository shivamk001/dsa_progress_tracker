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

router.get('/dsaapi/user/progress', UsersController.getUserProgress);

router.post('/dsaapi/user/mark', UsersController.markProblem);

router.post('/dsaapi/users/revision', UsersController.tbd);

router.post('/dsaapi/users/notes', UsersController.tbd);

export default router;
