const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, profile_picture } = req.body;
    await User.update({ name, profile_picture }, { where: { id: req.params.id } });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
