# Installation Guide

Complete step-by-step installation guide for the Blood Bank Management System.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local) OR **MongoDB Atlas** (cloud) - [Get Started](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)
- **Gmail Account** (for email functionality)

## Step 1: Clone or Download

### Option A: Clone with Git
```bash
git clone <your-repository-url>
cd blood-bank-management
```

### Option B: Download ZIP
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal in the project folder

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React and React Router
- Express and middleware
- MongoDB driver (Mongoose)
- Email service (Nodemailer)
- Authentication (JWT, bcrypt)
- PDF/Excel libraries
- And more...

**Expected time:** 2-5 minutes depending on internet speed

## Step 3: Setup MongoDB

### Option A: Local MongoDB

1. **Install MongoDB Community Edition**
   - Windows: [Download Installer](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB Service**
   - Windows: MongoDB should start automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify MongoDB is Running**
   ```bash
   mongosh
   ```
   If you see MongoDB shell, it's working!

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add `/bloodbank` at the end

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bloodbank
   ```

## Step 4: Setup Gmail for Email

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Blood Bank App"
   - Click "Generate"
   - Copy the 16-character password (remove spaces)

3. **Save Credentials**
   - Email: your Gmail address
   - Password: the 16-character app password

## Step 5: Configure Environment Variables

1. **Create .env file**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env file**
   Open `.env` in a text editor and fill in:

   ```env
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/bloodbank
   
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank
   
   JWT_SECRET=your_random_secret_key_at_least_32_characters_long
   
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your16charapppassword
   
   PORT=5000
   ```

3. **Generate JWT Secret**
   You can use any random string, or generate one:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## Step 6: Seed Database (Optional)

Create sample data for testing:

```bash
npm run seed
```

This creates:
- 1 admin user: `admin@bloodbank.com` / `admin123`
- 5 donor users: `donor1@example.com` to `donor5@example.com` / `password123`
- Sample donations for each donor

## Step 7: Start the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
npm run server
```

You should see:
```
Server running on port 5000
MongoDB connected
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Access the Application

Open your browser and go to: **http://localhost:5173**

## Step 8: Test the Application

### Test Registration Flow

1. Click "Register"
2. Fill in the form:
   - Name: Test User
   - Email: your-real-email@gmail.com (use your actual email!)
   - Password: test123
   - Blood Type: A+
   - Phone: 1234567890
   - Age: 25
   - Address: 123 Test St
3. Click "Register"
4. Check your email for OTP
5. Enter the 6-digit OTP
6. You should be logged in!

### Test Donation Recording

1. Go to "Donations" page
2. Click "Record Donation"
3. Fill in:
   - Blood Type: A+
   - Quantity: 350
   - Status: Donated
   - Notes: First donation
4. Click "Record Donation"
5. See it appear in the history

### Test Admin Features

1. **Make yourself admin:**
   - Open MongoDB Compass or mongosh
   - Find your user in the `users` collection
   - Change `role` from `"donor"` to `"admin"`
   - Save

2. **Logout and login again**

3. **Access Reports:**
   - Click "Reports" in navigation
   - Select today's date
   - View statistics
   - Click "Export PDF" or "Export Excel"

## Troubleshooting

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### MongoDB Connection Error

**Error:** `MongoServerError: Authentication failed`

**Solutions:**
- Check username and password in connection string
- Verify database user exists in MongoDB Atlas
- Check IP whitelist includes your IP or 0.0.0.0/0

### Email Not Sending

**Error:** `Invalid login: 535-5.7.8 Username and Password not accepted`

**Solutions:**
- Verify 2FA is enabled on Gmail
- Generate a new app password
- Remove spaces from app password
- Check EMAIL_USER and EMAIL_PASS in .env

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### React App Not Loading

**Error:** Blank page or errors in browser console

**Solutions:**
- Check browser console for errors
- Verify backend is running on port 5000
- Clear browser cache
- Try incognito/private mode

## Verification Checklist

- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] MongoDB running (local or Atlas)
- [ ] Dependencies installed (`npm install` completed)
- [ ] .env file created and configured
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:5173
- [ ] Registration works
- [ ] Email OTP received
- [ ] Login works
- [ ] Can record donations
- [ ] Dashboard shows data

## Next Steps

1. **Customize the App**
   - Update colors in `src/index.css`
   - Modify email templates in `server/utils/email.js`
   - Add your logo

2. **Deploy to Production**
   - Follow `DEPLOYMENT.md` for Netlify deployment
   - Use MongoDB Atlas for production database
   - Set up custom domain

3. **Add More Features**
   - See `FEATURES.md` for enhancement ideas
   - Implement SMS notifications
   - Add blood request system

## Getting Help

If you encounter issues:

1. Check the error message carefully
2. Review this installation guide
3. Check `README.md` for additional info
4. Review `TROUBLESHOOTING.md` (if available)
5. Check MongoDB and email service status

## Useful Commands

```bash
# Install dependencies
npm install

# Start backend server
npm run server

# Start frontend development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Seed database with sample data
npm run seed

# Check Node version
node --version

# Check npm version
npm --version
```

## System Requirements

### Minimum
- Node.js 18+
- 2GB RAM
- 500MB disk space
- Internet connection

### Recommended
- Node.js 20+
- 4GB RAM
- 1GB disk space
- Stable internet connection

## Success!

If you can:
- ✅ Register a new user
- ✅ Receive OTP email
- ✅ Verify and login
- ✅ Record a donation
- ✅ View dashboard

**Congratulations! Your Blood Bank Management System is ready! 🎉**

Now you can proceed to deployment or start customizing the application.
