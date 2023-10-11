import prisma from '../prisma/client.js';
import { StatusCodes } from 'http-status-codes';

export const getAllSAF = async (req, res) => {
  res.send('get al SAF');
};

export const getSAF = async (req, res) => {
  res.send('get one SAF');
};

export const createSAF = async (req, res) => {
  const { studentID, titleID, course, descBrief, hrPerWeek, priorSubmission } =
    req.body;
  const saf = await prisma.sAF.create({
    data: {
      studentID,
      titleID,
      course,
      descBrief,
      hrPerWeek: parseInt(hrPerWeek),
      priorSubmission: parseInt(priorSubmission),
    },
  });
  const titleUpdate = await prisma.title.update({
    where: { titleID },
    data: { availability: false },
  });
  res
    .status(StatusCodes.CREATED)
    .json({ data: { saf, titleUpdate }, msg: 'SAF submitted' });
};

export const updateSAF = async (req, res) => {
  res.send('update SAF');
};

export const deleteSAF = async (req, res) => {
  res.send('delete SAF');
};
