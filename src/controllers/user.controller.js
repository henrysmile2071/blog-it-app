/**
 * User controller
 *
 * @author Henry Chen
 */
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { findByEmail, create } from '../services/user.service.js';

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;
/**
 * @constant {UnauthorizedError} UnauthorizedError - unauthorized error object
 */
const { UnauthorizedError } = errors.default;

/**
 * Function which provides functionality
 * to add/create new user in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addUser = async (req, res) => {
  await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler());
};

/**
 * Function which provides functionality
 * to login specific user based on provided userEmail and userPassword
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {UnauthorizedError} - if login fails
 */
const loginUser = async (req, res) => {
  const user = await findByEmail(req.body.email);
  if (!user) {
    throw new UnauthorizedError();
  }
  const compareResult = await user.comparePassword(req.body.password);
  if (!compareResult) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  );

  res.status(httpStatus.OK).send(responseHandler(token));
};

export {
  addUser,
  loginUser,
};
