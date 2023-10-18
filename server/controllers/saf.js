import prisma from '../prisma/client.js';
import { StatusCodes } from 'http-status-codes';

export const getAllSAF = async (req, res) => {
  res.send('get al SAF');
};

export const getSAF = async (req, res) => {
  const { user_id } = req.query;
  const studentID = user_id.match(/^\d{8}$/);
  const lecturerID = user_id.match(/^[a-z]+$/);
  let saf;

  if (studentID) {
    // find saf for student
    saf = await prisma.sAF.findUnique({
      where: { studentID: user_id },
      include: {
        fypTitle: {
          include: {
            supervisor: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  } else if (lecturerID) {
    // find saf for lecturers
    saf = await prisma.sAF.findMany({
      where: {
        fypTitle: { proposedBy: user_id },
      },
      include: {
        fypTitle: {
          include: {
            supervisor: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        student: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (saf.length === 0) {
      saf = null;
    }
  }

  res.status(StatusCodes.OK).json({ saf });
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
    .json({ saf, titleUpdate, msg: 'SAF submitted' });
};

export const updateSAF = async (req, res) => {
  const { id } = req.params;
  const { studentID, titleID, course, descBrief, hrPerWeek, priorSubmission } =
    req.body;
  let saf;
  let msg;

  if (method === 'PUT') {
    // do the edit saf logic
    saf = await prisma.sAF.update({
      where: { safID: id },
      data: {
        studentID,
        titleID,
        course,
        descBrief,
        hrPerWeek: parseInt(hrPerWeek),
        priorSubmission: parseInt(priorSubmission),
      },
    });
    msg = 'SAF updated';
  } else if (method === 'PATCH') {
    // do the approve saf logic
    saf = await prisma.sAF.update({
      where: { safID: id },
      data: { approved: true },
    });
    msg = 'SAF approved';
  }
  res.status(StatusCodes.OK).json({ saf, msg });
};

export const deleteSAF = async (req, res) => {
  res.send('delete SAF');
};
