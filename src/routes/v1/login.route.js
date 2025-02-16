import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import { loginUser } from '../../controllers/user.controller.js';
import { loginUserSchema } from '../../validations/users-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginUserRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           example: example@mail.com
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *           example: passwordexample
 *
 *     LoginUserSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         body:
 *           type: string
 *           description: jwt token for authorized actions
 *           example: jwt
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to login user, returns jwt token on successful login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: returns a jwt token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserSuccess'
 *
 */
router
  .route('/')
  .post(validate({ body: loginUserSchema }), loginUser);

export default router;
