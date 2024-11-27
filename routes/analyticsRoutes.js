const express = require('express');
const router = express.Router();
const { getTotalBookings, getServicePopularity, getActiveUsers } = require('../utils/analytics');

// Get Total Bookings
router.get('/total-bookings', async (req, res) => {
    try {
        const totalBookings = await getTotalBookings();
        res.send({ totalBookings });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get Service Popularity
router.get('/service-popularity', async (req, res) => {
    try {
        const servicePopularity = await getServicePopularity();
        res.send(servicePopularity);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get Active Users
router.get('/active-users', async (req, res) => {
    try {
        const activeUsers = await getActiveUsers();
        res.send(activeUsers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
