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
safRouter.route('/:id').get(getSAF).patch(updateSAF).delete(deleteSAF);
