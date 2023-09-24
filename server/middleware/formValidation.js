import express from 'express';
import { check, validationResult } from 'express-validator';

// Custom middleware using Express Validator
export const validateUser = [
  // Validate inputs using express-validator
  check('userID')
    .isString()
    .toLowerCase()
    .notEmpty()
    .withMessage('User ID cannot be empty'),
  check('roleID')
    .isDecimal()
    .withMessage('Role ID should be a digit')
    .notEmpty()
    .withMessage('Role ID cannot be empty'),
  check('fName')
    .isString()
    .notEmpty()
    .withMessage('First name cannot be empty'),
  check('lName').isString().notEmpty().withMessage('Last name cannot be empty'),
  check('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password should be 8 - 16 characters in length')
    .notEmpty()
    .withMessage('Password cannot be empty'),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
