// user login logout currentuser
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import currentUser from '../middlewares/currentUser';

const router = express.Router();

// TODO: USER EXPRESS VALIDATOR

router.post('/auth/signup', AuthController.signup);

router.post('/auth/signin', AuthController.signin);

router.get('/auth/signout', AuthController.signout);

router.get('/auth/currentuser', currentUser, AuthController.currentUser);

export default router;

