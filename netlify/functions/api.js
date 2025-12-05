const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('../../server/routes/auth');
const donationRoutes = require('../../server/routes/donations');
const reportRoutes = require('../../server/routes/reports');

const app = express();

app.use(cors());
app.use(express.json());

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    
    cachedDb = db;
    console.log('MongoDB connected');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use('/auth', authRoutes);
app.use('/donations', donationRoutes);
app.use('/reports', reportRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Blood Bank API is running' });
});

module.exports.handler = serverless(app);
