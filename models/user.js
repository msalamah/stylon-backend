const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define User model
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false }, // Vendor or Customer
  profile_picture: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true,
  tableName: 'users'
});

module.exports = User;
