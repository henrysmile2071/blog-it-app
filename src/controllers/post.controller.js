/**
 * Post controller
 *
 * @author Henry Chen
 */
import httpStatus from 'http-status';

import * as response from '../middlewares/response-handler.js';
import { findAllPosts, create } from '../services/post.service.js';

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;

/**
 * Function which provides functionality
 * to add/create new post in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addPost = async (req, res) => {
  req.body.userId = req.user.id;
  await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler());
};

/**
 * Function which provides functionality
 * to get all posts with pagination
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 */
const getAllPosts = async (req, res) => {
  const posts = await findAllPosts(req.query);
  res.status(httpStatus.OK).send(responseHandler(posts));
};

export {
  addPost,
  getAllPosts,
};
