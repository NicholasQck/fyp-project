import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors/badRequest.js';
import { UnauthenticatedError } from '../errors/unauthenticated.js';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    throw new BadRequestError('Please enter your username and password');
  }

  const user = await prisma.user.findUnique({
    where: {
      userID: username,
    },
  });

  if (!user) {
    throw new UnauthenticatedError('Incorrect username or password');
  }

  const { userID, roleID, firstName, lastName, password } = user;
  const passwordMatch = await bcrypt.compare(pass, password);

  if (!passwordMatch) {
    throw new UnauthenticatedError('Incorrect username or password');
  }

  const token = jwt.sign(
    { userID, roleID, fName: firstName, lName: lastName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  res.status(StatusCodes.OK).json({ token });
};
