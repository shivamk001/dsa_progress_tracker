// get all problems
import express from 'express';
import { ProblemsController } from '../controllers/problems.controller';

const router = express.Router();

router.post('/problems', ProblemsController.tbd);

router.post('/problems', ProblemsController.tbd);

router.get('/problems', ProblemsController.tbd);

export default router;
