// get all problems
import express, { Request, Response, NextFunction } from 'express';
import { ProblemsController } from '../controllers/problems.controller';
import logger from '../utils/logger';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`Problems Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
})

router.get('/dsaapi/problems/all', ProblemsController.getAllProblems);

router.get('/dsaapi/problems/:id', ProblemsController.getProblem);

// using query
router.get('/dsaapi/problems', ProblemsController.getProblemByQuery);

export default router;
