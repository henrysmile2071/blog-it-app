/**
 * Model class for "User"
 *
 * @author Henry Chen
 *
 * @param {Sequelize} sequelize - sequelize object
 * @param {Sequelize.DataTypes} DataTypes - sequelize datatypes
 *
 * @returns User - sequelize model for user entity
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'user',
    underscored: true,
  });

  User.associate = models => {
    models.User.hasMany(models.Post, { foreignKey: 'userId', targetId: 'id' });
  };
  return User;
};
