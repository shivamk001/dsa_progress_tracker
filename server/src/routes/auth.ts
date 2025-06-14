// user login logout currentuser
import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

// TODO: USER EXPRESS VALIDATOR

router.post('/auth/signup', AuthController.signup);

router.post('/auth/signin', AuthController.signin);

router.post('/auth/signout', AuthController.signout);

router.get('/auth/currentuser', AuthController.currentUser);

export default router;

