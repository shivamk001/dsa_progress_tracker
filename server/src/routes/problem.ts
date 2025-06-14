// get all problems
import express from 'express';
import { ProblemsController } from '../controllers/problems.controller';

const router = express.Router();

router.post('/problems/all', ProblemsController.getAllProblems);

router.post('/problems/:id', ProblemsController.getProblem);

router.post('/problems/:level', ProblemsController.getProblem);

router.post('/problems/:name', ProblemsController.getProblem);

router.get('/problems', ProblemsController.tbd);

export default router;
