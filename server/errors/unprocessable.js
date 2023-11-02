import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError.js';

export class unprocessableError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}
