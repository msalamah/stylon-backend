const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const { name, profile_picture } = req.body;
  await User.update({ name, profile_picture }, { where: { id: req.params.id } });
  res.send("User updated");
});

module.exports = router;
