# Role-Based Registration System

## Overview

The Blood Bank Management System now has **separate registration pages** for three different user types:

1. **Blood Donors** 🩸
2. **Blood Receivers** 🏥
3. **Administrators** 👨‍💼

## User Roles

### 1. Donor (Blood Donor)
- **Purpose**: Register to donate blood
- **Age Requirement**: 18-65 years
- **Features**:
  - Record blood donations
  - Track donation history
  - View personal statistics
  - Receive donation confirmations

### 2. Receiver (Blood Receiver)
- **Purpose**: Register to request blood when needed
- **Age Requirement**: Any age (1-120 years)
- **Features**:
  - Request blood
  - Track blood received
  - View personal statistics
  - Receive notifications

### 3. Admin (Administrator)
- **Purpose**: Manage blood bank operations
- **Special Requirement**: Admin code required
- **Admin Code**: `BLOODBANK2024` (change this in production!)
- **Features**:
  - View all donations
  - Generate reports
  - Export to PDF/Excel
  - Manage users
  - System-wide statistics

## Registration Flow

### Step 1: Choose Registration Type
Visit: http://localhost:5173/register

You'll see three options:
- 🩸 Blood Donor
- 🏥 Blood Receiver
- 👨‍💼 Administrator

### Step 2: Fill Registration Form
Each role has a customized form:

**Donor Form** (`/register-donor`):
- Name, Email, Password
- Blood Type (what you can donate)
- Phone, Age (18-65), Address

**Receiver Form** (`/register-receiver`):
- Name, Email, Password
- Blood Type (what you need)
- Phone, Age (any), Address

**Admin Form** (`/register-admin`):
- Admin Code (required first)
- Name, Email, Password
- Blood Type, Phone, Age, Address

### Step 3: Email Verification
- Receive 6-digit OTP via email
- Enter OTP to verify account
- Get welcome email
- Automatically logged in

## Routes

### Public Routes
- `/` - Home page with information
- `/login` - Login page
- `/register` - Choose registration type
- `/register-donor` - Donor registration
- `/register-receiver` - Receiver registration
- `/register-admin` - Admin registration
- `/verify-otp` - Email OTP verification

### Protected Routes (Require Login)
- `/dashboard` - User dashboard (all roles)
- `/donations` - Donation management (all roles)
- `/reports` - Reports and analytics (admin only)

## Database Schema Update

The User model now supports three roles:

```javascript
{
  role: {
    type: String,
    enum: ['donor', 'receiver', 'admin'],
    default: 'donor'
  }
}
```

## Visual Differences

### Dashboard
Each role sees their role badge:
- 🩸 Blood Donor (Purple)
- 🏥 Blood Receiver (Red)
- 👨‍💼 Administrator (Green)

### Navigation
- Donors & Receivers: Dashboard, Donations
- Admins: Dashboard, Donations, Reports

## Security

### Admin Registration
- Requires admin code: `BLOODBANK2024`
- Code is verified before registration
- Change the code in `src/pages/RegisterAdmin.jsx` for production

### Email Verification
- All users must verify email with OTP
- OTP expires in 10 minutes
- Can resend OTP if needed

## Testing

### Test Accounts (from seed script)
```
Admin:
Email: admin@bloodbank.com
Password: admin123

Donor:
Email: donor1@example.com
Password: password123
```

### Register New Users
1. Go to http://localhost:5173/
2. Click "Register"
3. Choose your role
4. Fill the form
5. Verify email with OTP
6. Start using the app!

## Files Created/Modified

### New Files
1. `src/pages/Home.jsx` - Landing page
2. `src/pages/RegisterChoice.jsx` - Choose registration type
3. `src/pages/RegisterDonor.jsx` - Donor registration
4. `src/pages/RegisterReceiver.jsx` - Receiver registration
5. `src/pages/RegisterAdmin.jsx` - Admin registration

### Modified Files
1. `src/App.jsx` - Added new routes
2. `src/pages/Dashboard.jsx` - Added role badge display
3. `server/models/User.js` - Added 'receiver' to role enum

## Customization

### Change Admin Code
Edit `src/pages/RegisterAdmin.jsx`:
```javascript
if (formData.adminCode !== 'YOUR_NEW_CODE') {
  setError('Invalid admin code');
  return;
}
```

### Change Age Requirements
Edit the respective registration files:
- Donor: `min="18" max="65"`
- Receiver: `min="1" max="120"`
- Admin: `min="18" max="65"`

### Change Colors
Each role has its own color scheme:
- Donor: Purple (#667eea)
- Receiver: Red (#dc3545)
- Admin: Green (#28a745)

## Benefits

✅ **Clear User Separation** - Each user type has dedicated registration
✅ **Role-Specific Features** - Different capabilities based on role
✅ **Better UX** - Users know exactly what they're signing up for
✅ **Security** - Admin registration requires special code
✅ **Flexibility** - Easy to add more roles in the future

## Next Steps

1. **Test all registration types**
2. **Customize admin code** for production
3. **Add role-specific features** as needed
4. **Update email templates** to mention user role
5. **Add role-based permissions** for more features

## Support

For questions or issues:
- Check the main README.md
- Review INSTALL.md for setup
- See FEATURES.md for complete feature list
