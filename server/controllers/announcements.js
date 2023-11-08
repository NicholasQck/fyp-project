import prisma from '../prisma/client.js';
import { StatusCodes } from 'http-status-codes';

export const getAllAnnouncements = async (req, res) => {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      postedAt: 'desc',
    },
  });
  res.status(StatusCodes.OK).json({ announcements });
};

export const createAnnouncement = async (req, res) => {
  const { title, content } = req.body;
  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
    },
  });
  res
    .status(StatusCodes.OK)
    .json({ announcement, msg: 'Announcement created' });
};

export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const announcement = await prisma.announcement.update({
    where: { announcementID: id },
    data: {
      title,
      content,
    },
  });
  res
    .status(StatusCodes.OK)
    .json({ announcement, msg: 'Announcement updated' });
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  const announcement = await prisma.announcement.delete({
    where: {
      announcementID: id,
    },
  });
  res
    .status(StatusCodes.OK)
    .json({ announcement, msg: 'Announcement deleted' });
};
