const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define Service model
const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendor_id: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false }, // Duration in minutes
}, {
  timestamps: true,
  tableName: 'services'
});

module.exports = Service;
