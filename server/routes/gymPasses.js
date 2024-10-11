const express = require('express');
const router = express.Router();
const GymPass = require('../models/GymPass');

router.get('/', async (req, res) => {
  try {
    const gymPasses = await GymPass.find();
    res.json(gymPasses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const gymPass = new GymPass(req.body);
  try {
    const newGymPass = await gymPass.save();
    res.status(201).json(newGymPass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;