const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Blood Bank - Email Verification OTP',
    html: `
      <h2>Email Verification</h2>
      <p>Your OTP for email verification is: <strong>${otp}</strong></p>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Blood Bank Management System',
    html: `
      <h2>Welcome ${name}!</h2>
      <p>Your email has been verified successfully.</p>
      <p>Thank you for registering with our Blood Bank Management System.</p>
      <p>You can now donate blood and help save lives!</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP, sendWelcomeEmail };
