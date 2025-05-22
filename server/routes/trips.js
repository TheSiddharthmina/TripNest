const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  try {
    const trip = new Trip({ ...req.body, user: req.user.id });
    const saved = await trip.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().populate('user', 'username');
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/my', verifyToken, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip.user.toString() !== req.user.id) return res.status(403).json("Not allowed");
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a trip
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip.user.toString() !== req.user.id) return res.status(403).json("Not allowed");
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json("Trip deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
