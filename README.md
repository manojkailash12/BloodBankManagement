# Blood Bank Management System

A comprehensive blood bank management application with email verification, donation tracking, and daily reporting features.

## Features

- 🔐 User Registration with Email OTP Verification
- 📧 Email Notifications (Welcome emails, OTP)
- 🩸 Blood Donation Tracking
- 📊 Daily Reports (PDF & Excel Export)
- 👥 User Management
- 📈 Blood Type Statistics
- 🔒 Secure Authentication with JWT

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Email**: Nodemailer
- **Reports**: jsPDF, xlsx
- **Deployment**: Netlify (Frontend + Serverless Functions)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
```

**Gmail Setup for Email:**
1. Enable 2-Factor Authentication in your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in EMAIL_PASS

### 3. MongoDB Setup

You can use:
- Local MongoDB installation
- MongoDB Atlas (free cloud database): https://www.mongodb.com/cloud/atlas

### 4. Development

Run backend server:
```bash
npm run server
```

Run frontend (in another terminal):
```bash
npm run dev
```

### 5. Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - EMAIL_USER
   - EMAIL_PASS

4. Deploy settings are already configured in `netlify.toml`

**Important for Netlify:**
- Install serverless-http: `npm install serverless-http`
- Environment variables must be set in Netlify dashboard
- MongoDB Atlas is recommended for production

## Usage

### User Registration
1. Register with email, password, blood type, and personal details
2. Receive OTP via email
3. Verify email with OTP
4. Login to access dashboard

### Recording Donations
1. Navigate to Donations page
2. Click "Record Donation"
3. Fill in blood type, quantity, and status
4. Submit to save

### Viewing Reports (Admin Only)
1. Navigate to Reports page
2. Select date
3. View statistics and donation details
4. Export to PDF or Excel

## Admin Access

To create an admin user, manually update a user in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/verify-otp` - Verify email OTP
- POST `/api/auth/resend-otp` - Resend OTP
- POST `/api/auth/login` - User login

### Donations
- POST `/api/donations` - Record donation
- GET `/api/donations` - Get user donations
- GET `/api/donations/all` - Get all donations (admin)

### Reports
- GET `/api/reports/daily?date=YYYY-MM-DD` - Daily report
- GET `/api/reports/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Date range report

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Email verification required
- Protected routes
- Admin-only access for reports

## License

MIT
