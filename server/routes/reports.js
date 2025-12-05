const express = require('express');
const Donation = require('../models/Donation');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/daily', auth, adminAuth, async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const donations = await Donation.find({
      donationDate: { $gte: startOfDay, $lte: endOfDay },
      status: 'donated'
    }).populate('donor', 'name email bloodType phone role');

    const received = await Donation.find({
      donationDate: { $gte: startOfDay, $lte: endOfDay },
      status: 'received'
    }).populate('donor', 'name email bloodType phone role');

    const totalUsers = await User.countDocuments({ isVerified: true });
    const newRegistrations = await User.countDocuments({
      isVerified: true,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const totalDonated = donations.reduce((sum, d) => sum + d.quantity, 0);
    const totalReceived = received.reduce((sum, d) => sum + d.quantity, 0);

    const bloodTypeStats = {};
    donations.forEach(d => {
      if (!bloodTypeStats[d.bloodType]) {
        bloodTypeStats[d.bloodType] = { donated: 0, count: 0 };
      }
      bloodTypeStats[d.bloodType].donated += d.quantity;
      bloodTypeStats[d.bloodType].count += 1;
    });

    res.json({
      date: targetDate,
      donations: {
        count: donations.length,
        total: totalDonated,
        details: donations
      },
      received: {
        count: received.length,
        total: totalReceived,
        details: received
      },
      registrations: {
        total: totalUsers,
        today: newRegistrations
      },
      bloodTypeStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const { role } = req.query;
    
    const query = { isVerified: true };
    if (role && role !== 'all') {
      query.role = role;
    }

    const users = await User.find(query)
      .select('name email bloodType phone age address role createdAt')
      .sort({ createdAt: -1 });

    // Get donation totals for each user
    const usersWithDonations = await Promise.all(users.map(async (user) => {
      const donations = await Donation.find({ 
        donor: user._id,
        status: { $in: ['donated', 'received'] }
      });
      
      const totalDonated = donations
        .filter(d => d.status === 'donated')
        .reduce((sum, d) => sum + d.quantity, 0);
      
      const totalReceived = donations
        .filter(d => d.status === 'received')
        .reduce((sum, d) => sum + d.quantity, 0);
      
      return {
        ...user.toObject(),
        totalDonated,
        totalReceived,
        donationCount: donations.filter(d => d.status === 'donated').length,
        receivedCount: donations.filter(d => d.status === 'received').length
      };
    }));

    const stats = {
      total: users.length,
      donors: users.filter(u => u.role === 'donor').length,
      receivers: users.filter(u => u.role === 'receiver').length,
      admins: users.filter(u => u.role === 'admin').length
    };

    res.json({ users: usersWithDonations, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/range', auth, adminAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const donations = await Donation.find({
      donationDate: { $gte: start, $lte: end }
    }).populate('donor', 'name email bloodType phone');

    const totalUsers = await User.countDocuments({ isVerified: true });
    const newRegistrations = await User.countDocuments({
      isVerified: true,
      createdAt: { $gte: start, $lte: end }
    });

    res.json({
      startDate: start,
      endDate: end,
      donations,
      totalUsers,
      newRegistrations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
