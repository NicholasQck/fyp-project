import prisma from '../prisma/client.js';
import { StatusCodes } from 'http-status-codes';
import { unprocessableError } from '../errors/unprocessable.js';

export const getAllSAF = async (req, res) => {
  const saf = await prisma.sAF.findMany({
    orderBy: [{ approvalStatus: 'asc' }, { submittedAt: 'desc' }],
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
  res.status(StatusCodes.OK).json({ saf });
};

export const getSAF = async (req, res) => {
  const { user_id } = req.query;
  const studentID = user_id.match(/^\d{8}$/);
  const lecturerID = user_id.match(/^[a-z]+$/);
  let saf;

  if (studentID) {
    // find saf for student
    console.log('test');
    saf = await prisma.sAF.findMany({
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
      orderBy: {
        submittedAt: 'desc',
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
      orderBy: [
        {
          approvalStatus: 'asc',
        },
        {
          submittedAt: 'desc',
        },
      ],
    });
  }

  res.status(StatusCodes.OK).json({ saf });
};

export const createSAF = async (req, res) => {
  const {
    studentID,
    titleID,
    course,
    descBrief,
    hrPerWeek,
    priorSubmission,
    remarks,
  } = req.body;
  const checkSaf = await prisma.sAF.findMany({
    where: {
      studentID,
    },
  });

  checkSaf.find((saf) => {
    if (saf.approvalStatus === 1 || saf.approvalStatus === 2) {
      throw new unprocessableError('Request cannot be processed');
    }
  });

  const saf = await prisma.sAF.create({
    data: {
      studentID,
      titleID,
      course,
      descBrief,
      hrPerWeek: parseInt(hrPerWeek),
      priorSubmission: parseInt(priorSubmission),
      remarks,
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
  const method = req.method;
  const { id } = req.params;
  const {
    studentID,
    titleID,
    course,
    descBrief,
    hrPerWeek,
    priorSubmission,
    remarks,
    approvalStatus,
  } = req.body;
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
        remarks,
      },
    });
    msg = 'SAF updated';
  } else if (method === 'PATCH') {
    // do the approve, reject, withdraw saf logic
    saf = await prisma.sAF.update({
      where: { safID: id },
      data: { approvalStatus },
    });
    if (approvalStatus === 2) {
      msg = 'SAF approved';
    } else if (approvalStatus === 3) {
      await prisma.title.update({
        where: {
          titleID: titleID,
        },
        data: {
          availability: true,
        },
      });
      msg = 'SAF rejected';
    } else if (approvalStatus === 4) {
      await prisma.title.update({
        where: {
          titleID: titleID,
        },
        data: {
          availability: true,
        },
      });
      msg = 'SAF withdrawn';
    }
  }
  res.status(StatusCodes.OK).json({ saf, msg });
};

export const deleteSAF = async (req, res) => {
  const { id } = req.params;
  const saf = await prisma.sAF.delete({
    where: {
      safID: id,
    },
  });

  let titleUpdate;
  if (saf.approvalStatus === 1 || saf.approvalStatus === 2) {
    titleUpdate = await prisma.title.update({
      where: {
        titleID: saf.titleID,
      },
      data: {
        availability: true,
      },
    });
  }
  res.status(StatusCodes.OK).json({ saf, titleUpdate, msg: 'SAF deleted' });
};
