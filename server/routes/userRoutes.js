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
  getUnassignedStudents,
} from '../controllers/users.js';

export const usersRouter = express.Router();

usersRouter.route('/').get(getAllUsers).post(validateUser).post(createUser);
usersRouter.route('/roles').get(getAllRoles);
usersRouter.route('/manage').get(getUnassignedStudents);
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
