const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const verifyToken = require('../middleware/verifyToken');

// Create a new service
router.post('/', verifyToken, async (req, res) => {
  try {
    const { vendor_id, category, description, price, duration } = req.body;
    const service = await Service.create({ vendor_id, category, description, price, duration });
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get a service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).send("Service not found");
    res.send(service);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update a service
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { category, description, price, duration } = req.body;
    await Service.update({ category, description, price, duration }, { where: { id: req.params.id } });
    res.send("Service updated successfully");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a service
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
