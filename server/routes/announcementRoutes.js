import express from 'express';

// import controllers
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcements.js';

export const announcementsRouter = express.Router();

announcementsRouter
  .route('/')
  .get(getAllAnnouncements)
  .post(createAnnouncement);
announcementsRouter
  .route('/:id')
  .patch(updateAnnouncement)
  .delete(deleteAnnouncement);
