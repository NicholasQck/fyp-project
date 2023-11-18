import express from 'express';

// import controllers
import {
  getAllTitles,
  getTitle,
  createTitle,
  updateTitle,
  deleteTitle,
  generateTitle,
  getAvailableTitles,
} from '../controllers/titles.js';

export const titlesRouter = express.Router();

titlesRouter.route('/').get(getAllTitles).post(createTitle);
titlesRouter.route('/generative').post(generateTitle);
titlesRouter.route('/available').get(getAvailableTitles);
titlesRouter.route('/user').get(getTitle);
titlesRouter.route('/:id').put(updateTitle).delete(deleteTitle);
