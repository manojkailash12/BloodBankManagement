# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/bloodbank
JWT_SECRET=my_super_secret_key_change_this_in_production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
```

### 3. Start MongoDB
Make sure MongoDB is running locally, or use MongoDB Atlas (see DEPLOYMENT.md)

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Open Browser
Visit: http://localhost:5173

### 6. Register & Test
1. Click "Register"
2. Fill in your details
3. Check your email for OTP
4. Verify and login
5. Start using the app!

## 📧 Gmail Setup (Required for Email OTP)

1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password
4. Use it in `.env` as `EMAIL_PASS`

## 🎯 Features to Test

- ✅ User Registration with Email OTP
- ✅ Email Verification
- ✅ Login/Logout
- ✅ Record Blood Donations
- ✅ View Donation History
- ✅ Dashboard Statistics
- ✅ Daily Reports (Admin only)
- ✅ Export to PDF/Excel (Admin only)

## 👨‍💼 Create Admin User

After registering, update in MongoDB:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Then logout and login again to access Reports.

## 🌐 Deploy to Netlify

See detailed instructions in `DEPLOYMENT.md`

Quick version:
1. Push to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy!

## 🆘 Common Issues

**Email not sending?**
- Check Gmail app password
- Ensure 2FA is enabled
- Try generating new app password

**MongoDB connection error?**
- Check if MongoDB is running: `mongod --version`
- Verify connection string in .env

**Port already in use?**
- Change PORT in .env
- Or kill the process: `npx kill-port 5000`

## 📚 Next Steps

- Customize the UI colors in `src/index.css`
- Add more blood types if needed
- Implement additional reports
- Add SMS notifications
- Create mobile app version

## 🤝 Need Help?

Check the full README.md for detailed documentation.
