import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import { addUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

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
 *         description: the users id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserSuccess'
 *
 */
router
  .route('/')
  .post(validate({ body: addUserSchema }), addUser);

export default router;
