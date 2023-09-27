import express from 'express';
import { validateUser } from '../middleware/formValidation.js';

// import controllers
import { login } from '../controllers/auth.js';

export const authRouter = express.Router();

authRouter.route('/login').post(login);
