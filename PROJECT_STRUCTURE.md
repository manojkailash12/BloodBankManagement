# Project Structure

```
blood-bank-management/
├── netlify/
│   └── functions/
│       └── api.js                 # Serverless function for Netlify deployment
├── public/
│   └── _redirects                 # Netlify redirect rules
├── server/
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── Donation.js            # Donation schema
│   │   └── User.js                # User schema with password hashing
│   ├── routes/
│   │   ├── auth.js                # Authentication routes (register, login, OTP)
│   │   ├── donations.js           # Donation management routes
│   │   └── reports.js             # Report generation routes
│   ├── utils/
│   │   └── email.js               # Email sending utilities (OTP, welcome)
│   ├── index.js                   # Express server entry point
│   └── seed.js                    # Database seeding script
├── src/
│   ├── components/
│   │   └── Navbar.jsx             # Navigation bar component
│   ├── pages/
│   │   ├── Dashboard.jsx          # User dashboard with statistics
│   │   ├── Donations.jsx          # Donation recording and history
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration form
│   │   ├── Reports.jsx            # Admin reports with PDF/Excel export
│   │   └── VerifyOTP.jsx          # Email OTP verification
│   ├── utils/
│   │   └── api.js                 # Axios instance with auth interceptor
│   ├── App.jsx                    # Main app with routing
│   ├── index.css                  # Global styles
│   └── main.jsx                   # React entry point
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── .nvmrc                         # Node version specification
├── DEPLOYMENT.md                  # Detailed deployment guide
├── index.html                     # HTML entry point
├── netlify.toml                   # Netlify configuration
├── package.json                   # Dependencies and scripts
├── PROJECT_STRUCTURE.md           # This file
├── QUICKSTART.md                  # Quick start guide
├── README.md                      # Main documentation
└── vite.config.js                 # Vite configuration

```

## Key Files Explained

### Backend (Server)

**server/index.js**
- Express server setup
- MongoDB connection
- Route mounting
- Main entry point for local development

**server/models/User.js**
- User schema with email, password, blood type, etc.
- Password hashing with bcrypt
- OTP storage for email verification
- Role-based access (donor/admin)

**server/models/Donation.js**
- Donation records schema
- Links to user (donor)
- Tracks blood type, quantity, status, date

**server/routes/auth.js**
- POST /register - User registration with OTP generation
- POST /verify-otp - Email verification
- POST /resend-otp - Resend OTP
- POST /login - User authentication

**server/routes/donations.js**
- POST / - Record new donation
- GET / - Get user's donations
- GET /all - Get all donations (admin only)

**server/routes/reports.js**
- GET /daily - Daily report with statistics
- GET /range - Date range report

**server/utils/email.js**
- sendOTP() - Send verification OTP
- sendWelcomeEmail() - Send welcome email after verification

**server/middleware/auth.js**
- JWT token verification
- Admin role checking

### Frontend (React)

**src/App.jsx**
- React Router setup
- Protected routes
- User state management

**src/pages/Login.jsx**
- Login form
- JWT token storage
- Redirect to dashboard

**src/pages/Register.jsx**
- Multi-field registration form
- Blood type selection
- Redirects to OTP verification

**src/pages/VerifyOTP.jsx**
- 6-digit OTP input
- Resend OTP functionality
- Auto-login after verification

**src/pages/Dashboard.jsx**
- User statistics
- Recent donations
- Blood type display

**src/pages/Donations.jsx**
- Record new donations
- View donation history
- Admin can see all donations

**src/pages/Reports.jsx**
- Admin-only access
- Date selection
- Statistics display
- PDF export (jsPDF)
- Excel export (xlsx)

**src/utils/api.js**
- Axios instance
- JWT token interceptor
- API base URL configuration

### Deployment

**netlify/functions/api.js**
- Serverless function wrapper
- MongoDB connection caching
- Express app handler

**netlify.toml**
- Build configuration
- Redirect rules
- Function settings

**public/_redirects**
- SPA routing support
- API proxy rules

## Data Flow

### Registration Flow
1. User fills registration form → POST /api/auth/register
2. Server creates user with OTP → Sends email
3. User enters OTP → POST /api/auth/verify-otp
4. Server verifies OTP → Returns JWT token
5. User redirected to dashboard

### Donation Flow
1. User clicks "Record Donation" → Opens form
2. User fills details → POST /api/donations
3. Server saves donation → Returns success
4. Frontend refreshes donation list

### Report Generation Flow
1. Admin selects date → GET /api/reports/daily?date=YYYY-MM-DD
2. Server queries donations and users
3. Server calculates statistics
4. Frontend displays data
5. User clicks export → Client-side PDF/Excel generation

## Environment Variables

Required for both development and production:
- MONGODB_URI - Database connection string
- JWT_SECRET - Secret key for JWT tokens
- EMAIL_USER - Gmail address for sending emails
- EMAIL_PASS - Gmail app password
- PORT - Server port (development only)

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  bloodType: String,
  phone: String,
  age: Number,
  address: String,
  isVerified: Boolean,
  otp: String,
  otpExpiry: Date,
  role: String (donor/admin),
  createdAt: Date
}
```

### Donations Collection
```javascript
{
  donor: ObjectId (ref: User),
  bloodType: String,
  quantity: Number,
  donationDate: Date,
  status: String (donated/received),
  notes: String
}
```

## API Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

Token contains:
- userId
- role (donor/admin)
- Expires in 7 days

## Features Summary

✅ User registration with email verification
✅ OTP-based email verification
✅ Secure password hashing
✅ JWT authentication
✅ Blood donation recording
✅ Donation history tracking
✅ Admin dashboard
✅ Daily reports
✅ PDF export
✅ Excel export
✅ Blood type statistics
✅ User registration tracking
✅ Responsive design
✅ Netlify deployment ready
