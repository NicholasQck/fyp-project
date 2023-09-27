import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/unauthenticated.js';

export const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication is unsuccessful');
  }

  const token = authHeader.split(' ')[1];

  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    const { userID, roleID } = verifiedUser;
    req.user = { userID, roleID };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication is unsuccessful');
  }
};
