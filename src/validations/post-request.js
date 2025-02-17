import { query, body } from "express-validator";

const addPostValidators = [
  body('title').notEmpty().withMessage('Title is required').escape(),
  body('content').notEmpty().withMessage('Content is required').escape(),
];

const getAllPostValidators = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 })
    .withMessage('Limit must be a positive integer'),
];

export {
  addPostValidators,
  getAllPostValidators,
};
