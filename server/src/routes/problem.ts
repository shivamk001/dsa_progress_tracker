// get all problems
import express, { Request, Response, NextFunction } from 'express';
import { ProblemsController } from '../controllers/problems.controller';
import logger from '../utils/logger';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`Problems Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
})

router.get('/problems/all', ProblemsController.getAllProblems);

router.get('/problems/:id', ProblemsController.getProblem);

// using query
router.get('/problems', ProblemsController.getProblemByQuery);

router.get('/problems', ProblemsController.tbd);

export default router;
