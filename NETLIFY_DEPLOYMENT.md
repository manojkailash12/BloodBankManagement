# 🚀 Netlify Deployment Guide

## Complete Step-by-Step Guide for Deploying Blood Bank Management System

### Prerequisites
- GitHub account
- Netlify account (free tier works)
- MongoDB Atlas account (free tier works)
- Gmail account with App Password

---

## Step 1: Prepare Your Code

### 1.1 Commit All Changes
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

---

## Step 2: MongoDB Atlas Setup

### 2.1 Create Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. **IMPORTANT**: Add `/bloodbank` at the end: `mongodb+srv://username:password@cluster.mongodb.net/bloodbank`

### 2.2 Whitelist IP Addresses
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

---

## Step 3: Gmail App Password Setup

### 3.1 Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification

### 3.2 Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Name it "Blood Bank App"
4. Copy the 16-character password (no spaces)

---

## Step 4: Deploy to Netlify

### 4.1 Connect Repository
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your blood bank repository

### 4.2 Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

### 4.3 Add Environment Variables
Click "Show advanced" → "New variable" and add these:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
NODE_ENV=production
```

**IMPORTANT**: 
- Replace `username:password` with your actual MongoDB credentials
- Use a strong random string for JWT_SECRET (at least 32 characters)
- Use your Gmail address for EMAIL_USER
- Use the 16-character App Password (no spaces) for EMAIL_PASS

### 4.4 Deploy
1. Click "Deploy site"
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://random-name-12345.netlify.app`

---

## Step 5: Verify Deployment

### 5.1 Test API Endpoint
Visit: `https://your-site.netlify.app/api`

You should see:
```json
{"message": "Blood Bank API is running"}
```

### 5.2 Test Registration
1. Go to your site
2. Click "Register as Donor"
3. Fill in the form
4. Submit and check your email for OTP

### 5.3 Test All Features
- ✅ Registration (Donor, Receiver, Admin)
- ✅ Email OTP verification
- ✅ Login
- ✅ Dashboard
- ✅ Donations management
- ✅ Reports with PDF/Excel export
- ✅ Analytics charts
- ✅ Find Blood Banks map
- ✅ Change password
- ✅ Forgot password

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. In Netlify, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to update DNS records

---

## Troubleshooting

### Issue: "Registration failed"
**Solution**: Check environment variables in Netlify dashboard
- Go to Site settings → Environment variables
- Verify all variables are set correctly
- Redeploy the site

### Issue: "Database connection failed"
**Solution**: 
- Verify MongoDB URI includes `/bloodbank` at the end
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify username and password are correct (URL encoded if special characters)

### Issue: "Email not sending"
**Solution**:
- Verify Gmail App Password is correct (16 characters, no spaces)
- Check 2FA is enabled on Gmail account
- Try generating a new App Password

### Issue: "Invalid token" or "JWT error"
**Solution**:
- Verify JWT_SECRET is at least 32 characters
- Clear browser localStorage and try again
- Redeploy with new JWT_SECRET

### Issue: Build fails
**Solution**:
- Check build logs in Netlify
- Verify all dependencies are in package.json
- Make sure Node version is 18 or higher

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bloodbank` |
| JWT_SECRET | Secret key for JWT tokens | `my-super-secret-key-min-32-chars` |
| EMAIL_USER | Gmail address | `yourname@gmail.com` |
| EMAIL_PASS | Gmail App Password | `abcd efgh ijkl mnop` (no spaces) |
| NODE_ENV | Environment mode | `production` |

---

## Continuous Deployment

Once set up, Netlify automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Netlify will automatically:
1. Pull latest code
2. Run build
3. Deploy to production
4. Update functions

---

## Monitoring

### View Logs
1. Go to Netlify dashboard
2. Click on your site
3. Go to "Functions" tab
4. Click on "api" function
5. View real-time logs

### Check Function Status
- Green dot = Function is running
- Red dot = Function has errors
- Click on function to see detailed logs

---

## Security Best Practices

1. ✅ Never commit `.env` file to GitHub
2. ✅ Use strong JWT_SECRET (32+ characters)
3. ✅ Use Gmail App Password, not regular password
4. ✅ Keep MongoDB credentials secure
5. ✅ Regularly rotate JWT_SECRET
6. ✅ Monitor function logs for suspicious activity

---

## Cost Estimate

- **Netlify**: Free (100GB bandwidth, 300 build minutes/month)
- **MongoDB Atlas**: Free (512MB storage, shared cluster)
- **Gmail**: Free
- **Total**: $0/month for small to medium usage

---

## Support

If you encounter issues:
1. Check Netlify function logs
2. Verify all environment variables
3. Test MongoDB connection
4. Check Gmail App Password
5. Review browser console for errors

---

## Next Steps

After successful deployment:
1. ✅ Test all features thoroughly
2. ✅ Create admin account
3. ✅ Add sample data
4. ✅ Share site URL with users
5. ✅ Monitor usage and logs
6. ✅ Set up custom domain (optional)

---

**Deployment Date**: December 5, 2025
**Status**: Ready for Production ✅
