import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const errorHandlingMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      customError.statusCode = StatusCodes.CONFLICT;
      customError.msg =
        'The User ID already exists, please provide another unique User ID';
    }
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};
