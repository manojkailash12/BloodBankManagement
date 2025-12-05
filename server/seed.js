const mongoose = require('mongoose');
const User = require('./models/User');
const Donation = require('./models/Donation');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodbank');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Donation.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@bloodbank.com',
      password: 'admin123',
      bloodType: 'O+',
      phone: '1234567890',
      age: 30,
      address: '123 Admin Street',
      isVerified: true,
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created: admin@bloodbank.com / admin123');

    // Create sample donors
    const donors = [];
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    
    for (let i = 1; i <= 5; i++) {
      const donor = new User({
        name: `Donor ${i}`,
        email: `donor${i}@example.com`,
        password: 'password123',
        bloodType: bloodTypes[i % bloodTypes.length],
        phone: `555000${i}000`,
        age: 25 + i,
        address: `${i}00 Donor Avenue`,
        isVerified: true,
        role: 'donor'
      });
      await donor.save();
      donors.push(donor);
    }
    console.log('Sample donors created');

    // Create sample donations
    for (const donor of donors) {
      for (let i = 0; i < 3; i++) {
        const donation = new Donation({
          donor: donor._id,
          bloodType: donor.bloodType,
          quantity: 350 + (i * 50),
          status: i % 2 === 0 ? 'donated' : 'received',
          donationDate: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)),
          notes: `Sample donation ${i + 1}`
        });
        await donation.save();
      }
    }
    console.log('Sample donations created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@bloodbank.com / admin123');
    console.log('Donor: donor1@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
