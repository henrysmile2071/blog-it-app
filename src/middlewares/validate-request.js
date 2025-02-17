import { validationResult } from 'express-validator';
import * as errors from '../utils/api-error.js';

const { BadRequestError } = errors.default;

export const validateRequest = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    throw new BadRequestError(err.array());
  }
  next();
};
