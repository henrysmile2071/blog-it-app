import express from 'express';

import { validateRequest } from '../../middlewares/validate-request.js';
import { addUser } from '../../controllers/user.controller.js';
import { addUserValidators } from '../../validations/users-request.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's name.
 *           example: Lawrence
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: example@mail.com
 *         password:
 *           type: string
 *           example: passwordexample
 *
 *     CreateUserRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/User'
 *       - type: object
 *
 *     CreateUserSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 */

/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: register success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *
 */
router
  .route('/')
  .post(addUserValidators, validateRequest, addUser);

export default router;
