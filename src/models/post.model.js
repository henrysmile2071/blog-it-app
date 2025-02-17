/**
 * Model class for "post"
 *
 * @author Henry Chen
 *
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns Post - sequelize model
 */
export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'post',
    underscored: true,
    name: {
      singular: 'post',
      plural: 'posts',
    },
  });

  Post.associate = models => {
    models.Post.belongsTo(models.User, { foreignKey: 'userId', targetId: 'id', as: 'author' });
  };
  return Post;
};
