import prisma from '../prisma/client.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../errors/badRequest.js';

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        roleID: 'asc',
      },
      { firstName: 'asc' },
    ],
    include: {
      role: true,
    },
  });
  res.status(StatusCodes.OK).json({ users });
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

  res.status(StatusCodes.CREATED).json({ user, msg: 'User created' });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userID, roleID, fName, lName } = req.body;
  const user = await prisma.user.update({
    where: {
      userID: id,
    },
    data: {
      userID,
      roleID: parseInt(roleID),
      firstName: fName,
      lastName: lName,
    },
  });
  res.status(StatusCodes.OK).json({ user, msg: 'User updated' });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      userID: id,
    },
  });
  res.status(StatusCodes.OK).json({ user, msg: 'User deleted' });
};

export const getAllRoles = async (req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: {
      roleID: 'desc',
    },
  });
  res.status(StatusCodes.OK).json({ roles });
};
