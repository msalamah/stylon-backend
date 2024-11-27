const Appointment = require('../models/appointment');
const Service = require('../models/service');
const User = require('../models/user');

// Total Bookings
async function getTotalBookings() {
    const totalBookings = await Appointment.count();
    return totalBookings;
}

// Service Popularity
async function getServicePopularity() {
    const servicePopularity = await Appointment.findAll({
        attributes: ['service_id', [sequelize.fn('COUNT', 'service_id'), 'booking_count']],
        group: ['service_id'],
        include: [{ model: Service, attributes: ['category', 'description'] }],
        order: [[sequelize.literal('booking_count'), 'DESC']],
    });
    return servicePopularity;
}

// Active Users (past month)
async function getActiveUsers() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const activeUsers = await Appointment.findAll({
        attributes: ['customer_id', [sequelize.fn('COUNT', 'customer_id'), 'activity_count']],
        group: ['customer_id'],
        where: { appointment_date: { $gte: oneMonthAgo } },
        include: [{ model: User, attributes: ['name', 'email'] }],
        order: [[sequelize.literal('activity_count'), 'DESC']],
    });
    return activeUsers;
}

module.exports = {
    getTotalBookings,
    getServicePopularity,
    getActiveUsers,
};
