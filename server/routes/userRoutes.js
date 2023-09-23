import express from 'express';
import { validateUser } from '../middleware/formValidation.js';

// import controllers
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllRoles,
} from '../controllers/users.js';

export const usersRouter = express.Router();

// usersRouter.use('/', validateUser);

usersRouter.route('/').get(getAllUsers).post(validateUser).post(createUser);
usersRouter.route('/roles').get(getAllRoles);
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
