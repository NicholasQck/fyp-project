import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export const errorHandlingMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      customError.statusCode = StatusCodes.NOT_FOUND;
      customError.msg = 'Operation failed, the record may have been removed';
    }

    if (err.code === 'P2003') {
      customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      customError.msg = 'Operation failed, contact support for assistance';
    }
  }

  if (err instanceof TypeError) {
    customError.statusCode = StatusCodes.TOO_MANY_REQUESTS;
    customError.msg = 'Too many requests, try again in 1 minute';
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};
