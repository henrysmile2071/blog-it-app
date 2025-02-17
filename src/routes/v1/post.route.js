import express from 'express';

import { validateRequest } from '../../middlewares/validate-request.js';
import authenticateJwt from '../../middlewares/auth.js';
import { addPost, getAllPosts } from '../../controllers/post.controller.js';
import { addPostValidators, getAllPostValidators } from '../../validations/post-request.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: post id
 *           example: 1
 *         title:
 *           type: string
 *           description: The post title.
 *           example: Lorem Upsum
 *         content:
 *           type: string
 *           description: The post's content.
 *           example: lorum upsum di get loeit
 *         author:
 *           type: string
 *           description: the authors username
 *           example: Lawrence
 *         createdAt:
 *           type: string
 *           description: timestamp at creation
 *           example: 2017-07-21T17:32:28Z
 *           format: date-time
 *
 *     CreatePostRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The post title.
 *           example: Lorem Upsum
 *         content:
 *           type: string
 *           description: The post's content.
 *           example: lorum upsum di get loeit
 *
 *     CreatePostSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *
 *     GetPostsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the API call was successful.
 *           example: true
 *         body:
 *           currentPage:
 *              type: integer
 *              description: The current page number.
 *              example: 1
 *           totalPages:
 *              type: integer
 *              description: The total number of available pages.
 *              example: 5
 *           totalPosts:
 *              type: integer
 *              description: The total number of posts available.
 *              example: 50
 *           data:
 *              type: array
 *              description: List of posts in the current page.
 *              items:
 *                $ref: '#/components/schemas/Post'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful.
 *           example: false
 *         msg:
 *           type: string
 *           description: A message describing the error.
 *           example: Unauthorized - Missing or invalid token.
 *         error:
 *           type: object
 *           description: Detailed error information.
 */

/**
* @openapi
* /api/posts:
*   get:
*     tags:
*       - v1
*     description: Endpoint to get all posts with pagination
*     parameters:
*       - in: query
*         name: page
*         schema:
*           type: integer
*           description: The page number for pagination (1-based).
*           example: 1
*       - in: query
*         name: limit
*         schema:
*           type: integer
*           description: The number of posts to retrieve per page.
*           example: 10
*     responses:
*       200:
*         description: get posts success.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/GetPostsResponse'
*
*/
router
  .route('/')
  .get(getAllPostValidators, validateRequest, getAllPosts);

/**
 * @openapi
 * /api/posts:
 *   post:
 *     tags:
 *       - v1
 *     description: Endpoint to create/add new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       201:
 *         description: create post success.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePostSuccess'
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router
  .route('/')
  .post(authenticateJwt, addPostValidators, validateRequest, addPost);

export default router;
