import db from '../src/models/index.js';

const { User, Post } = db.db;

const truncateTables = async () => {
  await Post.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });
};

const insertData = async data => {
  await User.create(data);
};

export {
  truncateTables,
  insertData,
};
