# Admin User Guide

## 🔐 Admin Access

After logging in as an admin, you'll see:
- Green "👨‍💼 ADMIN" badge in the navigation bar
- Additional menu items: "👥 Users" and "📊 Reports"

## 📊 Navigation Menu (Admin)

1. **Dashboard** - Overview and statistics
2. **Donations** - View all donations
3. **👥 Users** - Manage all registered users
4. **📊 Reports** - Generate and export reports (GREEN BUTTON)

---

## 📈 Dashboard Features

### Admin Dashboard Shows:
- **Total Registered Users** - All verified users
- **Blood Donors** - Count of donors
- **Blood Receivers** - Count of receivers
- **Administrators** - Count of admins
- **Total Donations** - All donation records
- **Blood Donated** - Total quantity donated
- **Blood Received Count** - Number of blood received records
- **Blood Received Quantity** - Total quantity received

### Recent Activity Table:
- Shows last 5 donations from all users
- Includes donor name, blood type, quantity, and status

---

## 👥 Users Page

**Location**: Click "👥 Users" in navigation

### Features:
- View all registered users
- Filter by role:
  - All Users
  - 🩸 Donors
  - 🏥 Receivers
  - 👨‍💼 Admins

### User Information Displayed:
- Name
- Email
- Role (with colored badge)
- Blood Type
- Phone
- Age
- Registration Date

---

## 📊 Reports Page (EXPORT LOCATION)

**Location**: Click "📊 Reports" (green button) in navigation

### Two Tabs Available:

---

### Tab 1: 📊 Daily Reports

**Purpose**: View and export daily donation statistics

**Features**:
- Select any date
- View statistics for that day:
  - Number of donations
  - Blood donated (ml)
  - Number of blood received
  - Blood received quantity
  - New registrations
- Blood type statistics
- Detailed donation list

**Export Options**:
- 📄 **Export PDF** - Professional PDF report
- 📊 **Export Excel** - Excel spreadsheet with multiple sheets

---

### Tab 2: 👥 Users Reports (MAIN EXPORT LOCATION)

**Purpose**: Export donor and receiver data

**This is where you export users!**

You'll see 3 cards:

#### 1. 🩸 Donors Card
Export all registered blood donors

**Buttons**:
- 📄 **PDF** - Exports donors list to PDF
  - Includes: Name, Email, Blood Type, Phone, Age, Registration Date
  - Filename: `donors-report-YYYY-MM-DD.pdf`

- 📊 **Excel** - Exports donors to Excel
  - Includes: Name, Email, Blood Type, Phone, Age, Address, Registration Date
  - Filename: `donors-report-YYYY-MM-DD.xlsx`

#### 2. 🏥 Receivers Card
Export all registered blood receivers

**Buttons**:
- 📄 **PDF** - Exports receivers list to PDF
  - Includes: Name, Email, Blood Type, Phone, Age, Registration Date
  - Filename: `receivers-report-YYYY-MM-DD.pdf`

- 📊 **Excel** - Exports receivers to Excel
  - Includes: Name, Email, Blood Type Needed, Phone, Age, Address, Registration Date
  - Filename: `receivers-report-YYYY-MM-DD.xlsx`

#### 3. 👥 All Users Card
Export complete user database

**Buttons**:
- 📄 **PDF** - Exports all users to PDF
  - Includes: Name, Email, Role, Blood Type, Phone, Registration Date
  - Shows summary: Total Users, Donors, Receivers, Admins
  - Filename: `all-users-report-YYYY-MM-DD.pdf`

- 📊 **Excel** - Exports complete database to Excel
  - **Multiple Sheets**:
    - Sheet 1: All Users (everyone)
    - Sheet 2: Donors only
    - Sheet 3: Receivers only
  - Filename: `complete-users-report-YYYY-MM-DD.xlsx`

---

## 🎯 Step-by-Step: How to Export Data

### Export Donors:
1. Login as admin
2. Click "📊 Reports" (green button)
3. Click "👥 Users Reports" tab
4. Find the "🩸 Donors" card
5. Click "📄 PDF" or "📊 Excel"
6. File downloads automatically

### Export Receivers:
1. Login as admin
2. Click "📊 Reports" (green button)
3. Click "👥 Users Reports" tab
4. Find the "🏥 Receivers" card
5. Click "📄 PDF" or "📊 Excel"
6. File downloads automatically

### Export All Users:
1. Login as admin
2. Click "📊 Reports" (green button)
3. Click "👥 Users Reports" tab
4. Find the "👥 All Users" card
5. Click "📄 PDF" or "📊 Excel"
6. File downloads automatically (Excel has 3 sheets!)

---

## 📋 What Gets Exported

### Donor Export Includes:
- Full Name
- Email Address
- Blood Type (what they can donate)
- Phone Number
- Age
- Home Address (Excel only)
- Registration Date

### Receiver Export Includes:
- Full Name
- Email Address
- Blood Type Needed
- Phone Number
- Age
- Home Address (Excel only)
- Registration Date

### All Users Export Includes:
- Everything above PLUS
- User Role (Donor/Receiver/Admin)
- Separate sheets for easy filtering (Excel only)

---

## 💡 Tips

1. **Excel vs PDF**:
   - Use **PDF** for printing or sharing
   - Use **Excel** for data analysis, filtering, or importing to other systems

2. **Complete Database Export**:
   - The "All Users" Excel export is the most comprehensive
   - It has 3 sheets: All Users, Donors, Receivers
   - Perfect for backup or data migration

3. **Daily Reports**:
   - Use the "Daily Reports" tab for donation statistics
   - Great for tracking daily operations

4. **User Management**:
   - Use the "👥 Users" page to view users in the app
   - Use the "Reports" page to export data

---

## 🔒 Security

- Only admins can access Reports and Users pages
- Regular donors and receivers cannot see these features
- Export buttons are disabled until data loads
- All exports include timestamp in filename

---

## 📞 Quick Reference

| What to Export | Where to Go | Which Button |
|----------------|-------------|--------------|
| Donors List | Reports → Users Reports Tab | 🩸 Donors → PDF/Excel |
| Receivers List | Reports → Users Reports Tab | 🏥 Receivers → PDF/Excel |
| All Users | Reports → Users Reports Tab | 👥 All Users → PDF/Excel |
| Daily Donations | Reports → Daily Reports Tab | Export PDF/Excel |
| View Users Online | Users Page | (No export, just view) |

---

## ✅ Checklist

Before exporting, make sure:
- [ ] You're logged in as admin
- [ ] You see the green "📊 Reports" button
- [ ] You clicked on "Reports"
- [ ] You selected the correct tab (Daily Reports or Users Reports)
- [ ] Data has loaded (buttons are not disabled)
- [ ] You clicked the correct export button

---

**Need Help?**
- Check if you're logged in as admin (look for green ADMIN badge)
- Make sure you're on the Reports page (green button in nav)
- Switch to "Users Reports" tab if you want to export users
- Wait for data to load before clicking export buttons
