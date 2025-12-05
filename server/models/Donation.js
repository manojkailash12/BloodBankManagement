const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  donationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['donated', 'received'], required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Donation', donationSchema);
