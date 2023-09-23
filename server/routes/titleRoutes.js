import express from 'express';

// import controllers
import {
  getAllTitles,
  getTitle,
  createTitle,
  updateTitle,
  deleteTitle,
} from '../controllers/titles.js';

export const titlesRouter = express.Router();

titlesRouter.route('/').get(getAllTitles).post(createTitle);
titlesRouter.route('/:id').get(getTitle).patch(updateTitle).delete(deleteTitle);
