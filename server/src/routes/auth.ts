// user login logout currentuser
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import currentUser from '../middlewares/currentUser';

const router = express.Router();

// TODO: USER EXPRESS VALIDATOR

router.post('/dsaapi/auth/signup', AuthController.signup);

router.post('/dsaapi/auth/signin', AuthController.signin);

router.get('/dsaapi/auth/signout', AuthController.signout);

router.get('/dsaapi/auth/currentuser', currentUser, AuthController.currentUser);

export default router;

