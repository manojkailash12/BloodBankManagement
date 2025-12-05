# 🧪 How to Test Your Netlify Deployment

## Quick Test (30 seconds)

1. **Visit the test page**
   ```
   https://your-site-name.netlify.app/netlify-test.html
   ```

2. **Click "Test /api Endpoint"**
   - ✅ Should show: "API is running!"
   - ❌ If fails: Check environment variables

3. **Click "Test Registration"**
   - ✅ Should show: "Registration successful!"
   - ✅ Check your email for OTP
   - ❌ If fails: See error message for details

---

## Full Manual Test (5 minutes)

### 1. Test Home Page
Visit: `https://your-site-name.netlify.app`
- Should load without errors
- Should show "Blood Bank Management System"

### 2. Test Registration
1. Click "Register as Donor"
2. Fill in the form:
   - Name: Test User
   - Email: your-email@gmail.com
   - Password: password123
   - Blood Type: A+
   - Phone: 1234567890
   - Age: 25
   - Address: Test Address
3. Click "Register as Donor"
4. Should redirect to OTP verification page
5. Check your email for 6-digit OTP

### 3. Test OTP Verification
1. Enter the 6-digit OTP from email
2. Click "Verify OTP"
3. Should redirect to dashboard
4. Should show welcome message

### 4. Test Dashboard
- Should show user name
- Should show blood type
- Should show role (Donor)
- Should have navigation menu

### 5. Test Donations
1. Click "Donations" in menu
2. Click "Add Donation"
3. Fill in donation details
4. Click "Submit"
5. Should show success message

### 6. Test Reports
1. Click "Reports" in menu
2. Should show donation statistics
3. Click "Export PDF"
4. Should download PDF file
5. Click "Export Excel"
6. Should download Excel file

### 7. Test Analytics
1. Click "Analytics" in menu
2. Should show charts
3. Charts should have data

### 8. Test Find Blood Banks
1. Click "Find Blood Banks" in menu
2. Should show map
3. Map should load correctly

### 9. Test Change Password
1. Click profile icon
2. Click "Change Password"
3. Enter current password
4. Enter new password
5. Click "Change Password"
6. Should show success message

### 10. Test Logout
1. Click profile icon
2. Click "Logout"
3. Should redirect to home page

---

## Common Issues and Solutions

### ❌ "API is not running"
**Solution**: 
1. Check Netlify function logs
2. Verify environment variables are set
3. Redeploy with cache clear

### ❌ "Registration failed"
**Possible causes**:
- MongoDB connection failed → Check MONGODB_URI
- Email sending failed → Check EMAIL_USER and EMAIL_PASS
- Database error → Check MongoDB Atlas network access

**Solution**:
1. Go to Netlify Dashboard
2. Site Settings → Environment Variables
3. Verify all 5 variables:
   - MONGODB_URI
   - JWT_SECRET
   - EMAIL_USER
   - EMAIL_PASS
   - NODE_ENV
4. Redeploy

### ❌ "Email not received"
**Solution**:
1. Check spam folder
2. Verify EMAIL_USER is correct
3. Verify EMAIL_PASS is App Password (not regular password)
4. Generate new App Password: https://myaccount.google.com/apppasswords

### ❌ "Database connection failed"
**Solution**:
1. Check MONGODB_URI ends with `/bloodbank`
2. Go to MongoDB Atlas → Network Access
3. Add IP: 0.0.0.0/0 (Allow from anywhere)
4. Verify username and password are correct

---

## Environment Variables Quick Check

Open Netlify Dashboard → Site Settings → Environment Variables

Should have exactly 5 variables:

```
✓ MONGODB_URI = mongodb+srv://...@cluster.mongodb.net/bloodbank
✓ JWT_SECRET = (32+ characters)
✓ EMAIL_USER = your-email@gmail.com
✓ EMAIL_PASS = (16 characters, no spaces)
✓ NODE_ENV = production
```

---

## Redeploy Steps

If you need to redeploy:

1. Go to Netlify Dashboard
2. Click "Deploys" tab
3. Click "Trigger deploy" button
4. Select "Clear cache and deploy site"
5. Wait 2-3 minutes
6. Test again

---

## View Function Logs

To see what's happening:

1. Go to Netlify Dashboard
2. Click "Functions" tab
3. Click "api" function
4. View real-time logs
5. Look for errors or warnings

---

## Success Checklist

After testing, you should have:

- ✅ API health check working
- ✅ Registration working
- ✅ Email OTP received
- ✅ Login working
- ✅ Dashboard accessible
- ✅ Donations can be added
- ✅ Reports can be generated
- ✅ PDF export working
- ✅ Excel export working
- ✅ Analytics charts showing
- ✅ Map loading correctly
- ✅ Password change working
- ✅ Logout working

---

## Need Help?

1. Check `QUICK_FIX.md` for common issues
2. Check `NETLIFY_DEPLOYMENT.md` for full guide
3. Check Netlify function logs for errors
4. Verify all environment variables
5. Test locally first with `npm run dev`

---

**Quick Links**:
- Test Page: `https://your-site.netlify.app/netlify-test.html`
- API Health: `https://your-site.netlify.app/api`
- Main Site: `https://your-site.netlify.app`
