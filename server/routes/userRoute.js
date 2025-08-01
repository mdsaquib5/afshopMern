import express from 'express';
import authUser from '../middlewares/authUser.js';
import { isAuth, login, logout, register } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser , isAuth);
userRouter.post('/logout', logout);

export default userRouter;