import { body } from 'express-validator';
import { findByEmail } from '../services/user.service.js';

const addUserValidators = [
  body('username').notEmpty().withMessage('Username is required').trim()
    .escape(),
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail()
    .custom(async value => {
      const user = await findByEmail(value);
      if (user) {
        throw new Error('Email already exists');
      }
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long').escape(),
];

const loginUserValidators = [
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').escape(),
];

export {
  addUserValidators,
  loginUserValidators,
};
