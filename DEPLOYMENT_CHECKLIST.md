# Deployment Checklist

Use this checklist to ensure smooth deployment to Netlify.

## Pre-Deployment

### 1. MongoDB Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a new cluster (free tier)
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0) in Network Access
- [ ] Get connection string
- [ ] Test connection locally

### 2. Gmail Setup
- [ ] Enable 2-Factor Authentication on Gmail
- [ ] Generate App Password
- [ ] Test email sending locally
- [ ] Verify OTP emails are received

### 3. Local Testing
- [ ] Install dependencies: `npm install`
- [ ] Create `.env` file with all variables
- [ ] Run backend: `npm run server`
- [ ] Run frontend: `npm run dev`
- [ ] Test registration flow
- [ ] Test OTP verification
- [ ] Test login
- [ ] Test donation recording
- [ ] Test reports (after creating admin user)
- [ ] Test PDF export
- [ ] Test Excel export

### 4. Code Preparation
- [ ] Remove console.logs (optional)
- [ ] Update README with your info
- [ ] Check .gitignore includes .env
- [ ] Commit all changes
- [ ] Push to GitHub

## Deployment to Netlify

### 5. GitHub Setup
- [ ] Create GitHub repository
- [ ] Push code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 6. Netlify Configuration
- [ ] Sign up/login to Netlify
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Connect to GitHub
- [ ] Select your repository
- [ ] Verify build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`

### 7. Environment Variables
Add these in Netlify dashboard (Site settings → Environment variables):
- [ ] `MONGODB_URI` = your MongoDB Atlas connection string
- [ ] `JWT_SECRET` = random secure string (min 32 chars)
- [ ] `EMAIL_USER` = your Gmail address
- [ ] `EMAIL_PASS` = your Gmail app password

### 8. Deploy
- [ ] Click "Deploy site"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check build logs for errors

## Post-Deployment

### 9. Testing Production
- [ ] Visit your Netlify URL
- [ ] Test registration
- [ ] Check email for OTP
- [ ] Verify OTP
- [ ] Test login
- [ ] Test donation recording
- [ ] Check if data saves to MongoDB

### 10. Create Admin User
- [ ] Register a user account
- [ ] Go to MongoDB Atlas
- [ ] Browse Collections → users
- [ ] Find your user
- [ ] Edit document
- [ ] Change `role` from `"donor"` to `"admin"`
- [ ] Save
- [ ] Logout and login again
- [ ] Verify "Reports" link appears

### 11. Test Admin Features
- [ ] Access Reports page
- [ ] Select different dates
- [ ] Export to PDF
- [ ] Export to Excel
- [ ] Verify data accuracy

### 12. Optional Enhancements
- [ ] Set up custom domain
- [ ] Enable Netlify Analytics
- [ ] Set up form notifications
- [ ] Configure deploy notifications
- [ ] Add site to search engines

## Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify all dependencies in package.json
- Ensure Node version is 18 (.nvmrc file)
- Check for syntax errors

### Functions Not Working
- Check Functions logs in Netlify
- Verify environment variables are set
- Test MongoDB connection string
- Check API routes match frontend

### Email Not Sending
- Verify Gmail app password (no spaces)
- Check 2FA is enabled
- Try generating new app password
- Check EMAIL_USER and EMAIL_PASS in Netlify

### Database Connection Issues
- Verify MongoDB connection string
- Check IP whitelist (should be 0.0.0.0/0)
- Verify database user permissions
- Test connection from local machine first

### OTP Not Received
- Check spam folder
- Verify email address is correct
- Check Netlify Functions logs
- Test email locally first

## Monitoring

### Regular Checks
- [ ] Monitor Netlify Analytics
- [ ] Check MongoDB Atlas usage
- [ ] Review Functions logs weekly
- [ ] Test critical flows monthly
- [ ] Update dependencies quarterly

### Performance
- [ ] Check page load times
- [ ] Monitor API response times
- [ ] Review database query performance
- [ ] Optimize images if needed

## Security

### Best Practices
- [ ] Never commit .env file
- [ ] Use strong JWT_SECRET
- [ ] Rotate Gmail app password periodically
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Use HTTPS only (Netlify provides this)

## Backup

### Data Protection
- [ ] Enable MongoDB Atlas backups
- [ ] Export user data periodically
- [ ] Keep local development copy
- [ ] Document recovery procedures

## Success Criteria

Your deployment is successful when:
- ✅ Users can register and receive OTP emails
- ✅ Email verification works
- ✅ Users can login
- ✅ Donations can be recorded
- ✅ Dashboard shows correct statistics
- ✅ Admin can access reports
- ✅ PDF export works
- ✅ Excel export works
- ✅ Data persists in MongoDB
- ✅ No console errors in browser
- ✅ No errors in Netlify logs

## Support Resources

- Netlify Docs: https://docs.netlify.com/
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- React Router: https://reactrouter.com/
- Express.js: https://expressjs.com/

## Next Steps After Deployment

1. Share the URL with users
2. Create user documentation
3. Set up monitoring alerts
4. Plan feature enhancements
5. Gather user feedback
6. Iterate and improve

---

**Congratulations on deploying your Blood Bank Management System! 🎉**
