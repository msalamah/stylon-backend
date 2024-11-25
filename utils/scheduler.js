const cron = require('node-cron');
const { sendNotification } = require('./notifications');
const Appointment = require('../models/appointment');
const User = require('../models/user');

// Scheduler to send reminders for upcoming appointments
cron.schedule('*/15 * * * *', async () => {
    const now = new Date();
    const upcomingAppointments = await Appointment.findAll({
        where: {
            appointment_date: {
                $gte: now,
                $lte: new Date(now.getTime() + 30 * 60 * 1000), // Next 30 minutes
            },
        },
    });

    for (const appointment of upcomingAppointments) {
        const customer = await User.findByPk(appointment.customer_id);
        if (customer && customer.fcm_token) {
            await sendNotification(
                customer.fcm_token,
                "Appointment Reminder",
                `You have an appointment scheduled at ${appointment.appointment_date}`
            );
        }
    }
});
