import express from 'express';

// import controllers
import {
  getAllTitles,
  getTitle,
  createTitle,
  updateTitle,
  deleteTitle,
  generateTitle,
} from '../controllers/titles.js';

export const titlesRouter = express.Router();

titlesRouter.route('/').get(getAllTitles).post(createTitle);
titlesRouter.route('/generative').post(generateTitle);
titlesRouter.route('/user').get(getTitle);
titlesRouter.route('/:id').put(updateTitle).delete(deleteTitle);
