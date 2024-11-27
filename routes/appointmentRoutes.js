const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Service = require('../models/service');
const User = require('../models/user');
const { sendNotification } = require('../utils/notifications');

// Create an appointment
router.post('/', async (req, res) => {
  try {
    const { customer_id, service_id, appointment_date } = req.body;

    // Check if the service exists
    const service = await Service.findByPk(service_id);
    if (!service) return res.status(404).send("Service not found");

    // Check for conflicting appointments
    const conflictingAppointments = await Appointment.findAll({
      where: {
        service_id,
        appointment_date
      }
    });

    if (conflictingAppointments.length > 0) {
      return res.status(400).send("Appointment time is already booked");
    }

    const appointment = await Appointment.create({ customer_id, service_id, appointment_date });

    // Notify the customer
    const customer = await User.findByPk(customer_id);
    if (customer && customer.fcm_token) {
      await sendNotification(
        customer.fcm_token,
        "Appointment Confirmed",
        `Your appointment is scheduled for ${appointment_date}`
      );
    }

    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get appointments by customer ID
router.get('/customer/:id', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ where: { customer_id: req.params.id } });
    res.send(appointments);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) return res.status(404).send("Appointment not found");

    await Appointment.update({ status }, { where: { id: req.params.id } });

    // Notify the customer
    const customer = await User.findByPk(appointment.customer_id);
    if (customer && customer.fcm_token) {
      const message = status === 'Confirmed'
        ? "Your appointment has been confirmed!"
        : "Your appointment has been cancelled.";
      await sendNotification(customer.fcm_token, "Appointment Status Updated", message);
    }

    res.send("Appointment updated successfully");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
