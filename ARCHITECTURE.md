# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     (http://localhost:5173)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                     │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │  Login   │ Register │   OTP    │Dashboard │Donations │  │
│  │  Page    │   Page   │  Verify  │   Page   │   Page   │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Reports Page (Admin Only)                │  │
│  │         PDF Export  |  Excel Export                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Axios HTTP Client
                         │ JWT Token in Headers
                         │
┌────────────────────────▼────────────────────────────────────┐
│              EXPRESS.JS BACKEND (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  API Routes                           │  │
│  │  /api/auth/*  |  /api/donations/*  |  /api/reports/* │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Authentication Middleware                │  │
│  │         JWT Verification  |  Role Checking            │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬───────────────────────────┬────────────────────┘
             │                           │
             │                           │
    ┌────────▼────────┐         ┌───────▼────────┐
    │   MONGODB       │         │  GMAIL SMTP    │
    │   Database      │         │  Email Service │
    │                 │         │                │
    │  - users        │         │  - OTP Emails  │
    │  - donations    │         │  - Welcome     │
    └─────────────────┘         └────────────────┘
```

## Data Flow Diagrams

### 1. User Registration Flow

```
User                Frontend              Backend              Database           Email
 │                     │                     │                     │                │
 │  Fill Form          │                     │                     │                │
 ├────────────────────>│                     │                     │                │
 │                     │  POST /auth/register│                     │                │
 │                     ├────────────────────>│                     │                │
 │                     │                     │  Create User        │                │
 │                     │                     │  Generate OTP       │                │
 │                     │                     ├────────────────────>│                │
 │                     │                     │                     │                │
 │                     │                     │  Send OTP Email     │                │
 │                     │                     ├─────────────────────────────────────>│
 │                     │                     │                     │                │
 │                     │  Success + userId   │                     │                │
 │                     │<────────────────────┤                     │                │
 │  Redirect to OTP    │                     │                     │                │
 │<────────────────────┤                     │                     │                │
 │                     │                     │                     │                │
 │  Receive Email      │                     │                     │                │
 │<─────────────────────────────────────────────────────────────────────────────────┤
```

### 2. OTP Verification Flow

```
User                Frontend              Backend              Database           Email
 │                     │                     │                     │                │
 │  Enter OTP          │                     │                     │                │
 ├────────────────────>│                     │                     │                │
 │                     │  POST /auth/verify  │                     │                │
 │                     ├────────────────────>│                     │                │
 │                     │                     │  Verify OTP         │                │
 │                     │                     │  Check Expiry       │                │
 │                     │                     ├────────────────────>│                │
 │                     │                     │                     │                │
 │                     │                     │  Update isVerified  │                │
 │                     │                     ├────────────────────>│                │
 │                     │                     │                     │                │
 │                     │                     │  Send Welcome Email │                │
 │                     │                     ├─────────────────────────────────────>│
 │                     │                     │                     │                │
 │                     │  JWT Token + User   │                     │                │
 │                     │<────────────────────┤                     │                │
 │  Store Token        │                     │                     │                │
 │  Redirect Dashboard │                     │                     │                │
 │<────────────────────┤                     │                     │                │
```

### 3. Donation Recording Flow

```
User                Frontend              Backend              Database
 │                     │                     │                     │
 │  Fill Donation Form │                     │                     │
 ├────────────────────>│                     │                     │
 │                     │  POST /donations    │                     │
 │                     │  + JWT Token        │                     │
 │                     ├────────────────────>│                     │
 │                     │                     │  Verify Token       │
 │                     │                     │  Extract User ID    │
 │                     │                     │                     │
 │                     │                     │  Create Donation    │
 │                     │                     ├────────────────────>│
 │                     │                     │                     │
 │                     │  Success            │                     │
 │                     │<────────────────────┤                     │
 │  Show Success       │                     │                     │
 │  Refresh List       │                     │                     │
 │<────────────────────┤                     │                     │
```

### 4. Report Generation Flow

```
Admin               Frontend              Backend              Database
 │                     │                     │                     │
 │  Select Date        │                     │                     │
 ├────────────────────>│                     │                     │
 │                     │  GET /reports/daily │                     │
 │                     │  + JWT Token        │                     │
 │                     ├────────────────────>│                     │
 │                     │                     │  Verify Admin Role  │
 │                     │                     │                     │
 │                     │                     │  Query Donations    │
 │                     │                     ├────────────────────>│
 │                     │                     │                     │
 │                     │                     │  Query Users        │
 │                     │                     ├────────────────────>│
 │                     │                     │                     │
 │                     │                     │  Calculate Stats    │
 │                     │                     │                     │
 │                     │  Report Data        │                     │
 │                     │<────────────────────┤                     │
 │  Display Report     │                     │                     │
 │<────────────────────┤                     │                     │
 │                     │                     │                     │
 │  Click Export PDF   │                     │                     │
 ├────────────────────>│                     │                     │
 │                     │  Generate PDF       │                     │
 │                     │  (Client-side)      │                     │
 │  Download PDF       │                     │                     │
 │<────────────────────┤                     │                     │
```

## Component Architecture

### Frontend Components

```
App.jsx (Root)
│
├── BrowserRouter
│   │
│   ├── Navbar (if authenticated)
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   └── Logout Button
│   │
│   └── Routes
│       │
│       ├── /login → Login.jsx
│       │   ├── Login Form
│       │   └── Link to Register
│       │
│       ├── /register → Register.jsx
│       │   ├── Registration Form
│       │   └── Link to Login
│       │
│       ├── /verify-otp → VerifyOTP.jsx
│       │   ├── OTP Input
│       │   └── Resend Button
│       │
│       ├── /dashboard → Dashboard.jsx (Protected)
│       │   ├── Statistics Cards
│       │   └── Recent Activity Table
│       │
│       ├── /donations → Donations.jsx (Protected)
│       │   ├── Record Donation Form
│       │   └── Donation History Table
│       │
│       └── /reports → Reports.jsx (Admin Only)
│           ├── Date Selector
│           ├── Statistics Display
│           ├── Export Buttons
│           └── Detailed Tables
```

### Backend Structure

```
server/
│
├── index.js (Entry Point)
│   ├── Express Setup
│   ├── MongoDB Connection
│   └── Route Mounting
│
├── models/
│   ├── User.js
│   │   ├── Schema Definition
│   │   ├── Password Hashing Hook
│   │   └── Password Comparison Method
│   │
│   └── Donation.js
│       └── Schema Definition
│
├── routes/
│   ├── auth.js
│   │   ├── POST /register
│   │   ├── POST /verify-otp
│   │   ├── POST /resend-otp
│   │   └── POST /login
│   │
│   ├── donations.js
│   │   ├── POST / (create)
│   │   ├── GET / (user donations)
│   │   └── GET /all (all donations)
│   │
│   └── reports.js
│       ├── GET /daily
│       └── GET /range
│
├── middleware/
│   └── auth.js
│       ├── auth() - JWT verification
│       └── adminAuth() - Role checking
│
└── utils/
    └── email.js
        ├── sendOTP()
        └── sendWelcomeEmail()
```

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  bloodType: String,
  phone: String,
  age: Number,
  address: String,
  isVerified: Boolean,
  otp: String (temporary),
  otpExpiry: Date (temporary),
  role: String (enum: 'donor', 'admin'),
  createdAt: Date
}
```

### Donations Collection

```javascript
{
  _id: ObjectId,
  donor: ObjectId (ref: 'User'),
  bloodType: String,
  quantity: Number,
  donationDate: Date,
  status: String (enum: 'donated', 'received'),
  notes: String
}
```

## API Endpoints

### Authentication Endpoints

```
POST /api/auth/register
Body: { name, email, password, bloodType, phone, age, address }
Response: { message, userId }

POST /api/auth/verify-otp
Body: { userId, otp }
Response: { message, token, user }

POST /api/auth/resend-otp
Body: { userId }
Response: { message }

POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

### Donation Endpoints

```
POST /api/donations
Headers: Authorization: Bearer <token>
Body: { bloodType, quantity, status, notes }
Response: { message, donation }

GET /api/donations
Headers: Authorization: Bearer <token>
Response: [donations]

GET /api/donations/all
Headers: Authorization: Bearer <token>
Response: [donations] (admin only)
```

### Report Endpoints

```
GET /api/reports/daily?date=YYYY-MM-DD
Headers: Authorization: Bearer <token>
Response: {
  date,
  donations: { count, total, details },
  received: { count, total, details },
  registrations: { total, today },
  bloodTypeStats
}

GET /api/reports/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Headers: Authorization: Bearer <token>
Response: { startDate, endDate, donations, totalUsers, newRegistrations }
```

## Security Architecture

### Authentication Flow

```
1. User Login
   ↓
2. Server validates credentials
   ↓
3. Server generates JWT token
   ↓
4. Client stores token in localStorage
   ↓
5. Client includes token in all API requests
   ↓
6. Server verifies token on each request
   ↓
7. Server checks user role for protected routes
```

### Password Security

```
Registration/Password Change
   ↓
Plain Password
   ↓
bcrypt.hash(password, 10)
   ↓
Hashed Password (stored in DB)

Login
   ↓
User enters password
   ↓
bcrypt.compare(entered, stored)
   ↓
Match → Generate JWT
No Match → Error
```

## Deployment Architecture (Netlify)

```
┌─────────────────────────────────────────────────────────┐
│                    NETLIFY CDN                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Static Files (React Build)                │  │
│  │         Served from Edge Locations                │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Netlify Functions (Serverless)            │  │
│  │         /api/* → /.netlify/functions/api          │  │
│  │         Express.js running in Lambda              │  │
│  └───────────────────────────────────────────────────┘  │
└────────────┬───────────────────────────┬────────────────┘
             │                           │
    ┌────────▼────────┐         ┌───────▼────────┐
    │  MongoDB Atlas  │         │  Gmail SMTP    │
    │  (Cloud DB)     │         │  (Email)       │
    └─────────────────┘         └────────────────┘
```

## Technology Stack Layers

```
┌─────────────────────────────────────────────┐
│         Presentation Layer                   │
│  React, React Router, CSS                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Application Layer                    │
│  Express.js, JWT, Middleware                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Business Logic Layer                 │
│  Routes, Controllers, Validation            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Data Access Layer                    │
│  Mongoose Models, Schemas                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Data Layer                           │
│  MongoDB Database                           │
└─────────────────────────────────────────────┘
```

## Request/Response Cycle

```
1. User Action (Click, Submit)
   ↓
2. React Component Handler
   ↓
3. Axios API Call (with JWT token)
   ↓
4. Express Route Handler
   ↓
5. Authentication Middleware (verify JWT)
   ↓
6. Authorization Check (role-based)
   ↓
7. Business Logic Execution
   ↓
8. Database Query (Mongoose)
   ↓
9. MongoDB Operation
   ↓
10. Response Data
   ↓
11. JSON Response to Client
   ↓
12. React State Update
   ↓
13. UI Re-render
```

## Error Handling Flow

```
Error Occurs
   ↓
Backend: try-catch block
   ↓
Send error response with status code
   ↓
Frontend: Axios catch block
   ↓
Extract error message
   ↓
Update error state
   ↓
Display error to user
```

This architecture ensures:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Performance
- ✅ User experience
