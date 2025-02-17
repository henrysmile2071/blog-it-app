/**
 * Post service which serves DB operation
 * required by post controller
 *
 * @author Henry Chen
 */
import db from '../models/index.js';
/**
 * @constant {Sequelize.models} - Post model extracted from db import
 */
const { Post, sequelize } = db.db;

/**
 * findAllPosts function to fetch data for all posts
 *
 * @returns {Promise} Posts object
 */
const findAllPosts = async data => {
  let { page, limit } = data;
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const offset = (page - 1) * limit;
  const posts = await sequelize.query(
    `
      SELECT 
        p.title, 
        p.content, 
        u.username AS author, 
        p.created_at AS "createdAt"
      FROM post p
      JOIN "user" u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT :limit OFFSET :offset
      `,
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: { limit, offset },
    },
  );

  const totalPosts = await sequelize.query(
    `
    SELECT COUNT(*) AS total FROM post
    `,
    {
      type: sequelize.QueryTypes.SELECT,
    },
  );

  const { total } = totalPosts[0];
  const totalPages = Math.ceil(total / limit);

  return {
    currentPage: page,
    totalPages,
    totalPosts: total,
    limit,
    data: posts,
  };
};

/**
 * create function to add new post
 *
 * @param {object} data - post object with information to be saved in system
 * @returns {Promise} Created post object
 */
const create = async data => Post.create(data);

export {
  findAllPosts,
  create,
};
