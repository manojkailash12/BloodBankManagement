const express = require('express');
const Donation = require('../models/Donation');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { bloodType, quantity, status, notes } = req.body;
    
    const donation = new Donation({
      donor: req.userId,
      bloodType,
      quantity,
      status,
      notes
    });

    await donation.save();
    res.status(201).json({ message: 'Donation recorded successfully', donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.userId })
      .sort({ donationDate: -1 })
      .populate('donor', 'name email bloodType');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ donationDate: -1 })
      .populate('donor', 'name email bloodType phone');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
