const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Define Appointment model
const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  service_id: { type: DataTypes.INTEGER, allowNull: false },
  appointment_date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' }, // Pending, Confirmed, Cancelled
}, {
  timestamps: true,
  tableName: 'appointments'
});

module.exports = Appointment;
