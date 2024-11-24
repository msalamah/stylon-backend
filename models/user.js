const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  profile_picture: DataTypes.STRING
});

module.exports = User;
