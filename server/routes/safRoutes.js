import express from 'express';

// import controllers
import {
  getAllSAF,
  getSAF,
  createSAF,
  updateSAF,
  deleteSAF,
} from '../controllers/saf.js';

export const safRouter = express.Router();

safRouter.route('/').get(getAllSAF).post(createSAF);
safRouter.route('/user').get(getSAF);
safRouter.route('/:id').patch(updateSAF).put(updateSAF).delete(deleteSAF);
