/**
 * User service which serves DB operation
 * required by user controller
 *
 * @author Henry Chen
 */
import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - User model extracted from db import
 */
const { User } = db.db;

/**
 * findByEmail function to fetch data for provided userEmail
 *
 * @param {number} userEmail - user email for which data needs to be fetched
 * @returns {Promise} User object
 */
const findByEmail = async userEmail => User.findOne({
  where: { email: userEmail },
});

/**
 * create function to add new user
 *
 * @param {object} data - user object with information to be saved in system
 * @returns {Promise} Created user object
 */
const create = async data => User.create(data);

export {
  findByEmail,
  create,
};
