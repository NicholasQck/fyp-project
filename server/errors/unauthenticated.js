import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customError.js';

export class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
