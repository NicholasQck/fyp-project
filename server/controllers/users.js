import { PrismaClient, Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors/badRequest.js';

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  res.send('get all users');
};

export const getUser = async (req, res) => {
  res.send('get user');
};

export const createUser = async (req, res) => {
  const { userID, roleID, fName, lName, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      userID,
      roleID: parseInt(roleID),
      firstName: fName,
      lastName: lName,
      password: hashedPassword,
    },
  });

  res.status(StatusCodes.CREATED).json({ data: user });
};

export const updateUser = async (req, res) => {
  res.send('update user');
};

export const deleteUser = async (req, res) => {
  res.send('delete user');
};

export const getAllRoles = async (req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: {
      roleID: 'asc',
    },
  });
  res.status(StatusCodes.OK).json({ roles });
};
