import prisma from '../prisma/client.js';
import { StatusCodes } from 'http-status-codes';

export const getAllTitles = async (req, res) => {
  const titles = await prisma.title.findMany({
    include: {
      supervisor: {
        // doesn't work
        // orderBy: {
        //   firstName: 'asc',
        // },
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  res.status(StatusCodes.OK).json({ titles });
};

export const getTitle = async (req, res) => {
  res.send('get single title');
};

export const createTitle = async (req, res) => {
  res.send('create title');
};

export const updateTitle = async (req, res) => {
  res.send('update title');
};

export const deleteTitle = async (req, res) => {
  res.send('delete title');
};
