# GitHub & Netlify Deployment Guide

## Step 1: Push to GitHub

### Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Blood Bank Management System"
```

### Connect to GitHub Repository

Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Setup MongoDB Atlas (Required for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Add `/bloodbank` at the end

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bloodbank`

## Step 3: Setup Gmail App Password

1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Other (Custom name)"
4. Enter "Blood Bank App"
5. Copy the 16-character password (remove spaces)

## Step 4: Deploy to Netlify

### Option A: Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Select your repository
5. Build settings (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

6. Click "Show advanced" → "New variable"
7. Add these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank
JWT_SECRET=your_random_secret_key_min_32_characters
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your16charapppassword
```

8. Click "Deploy site"

### Option B: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Step 5: Configure Environment Variables in Netlify

1. Go to your site in Netlify dashboard
2. Click "Site settings" → "Environment variables"
3. Add each variable:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`

## Step 6: Test Your Deployment

1. Visit your Netlify URL (e.g., `https://your-app.netlify.app`)
2. Test registration with your real email
3. Check email for OTP
4. Verify and login
5. Test all features

## Step 7: Create Admin User

After deployment:

1. Register a user through the app
2. Go to MongoDB Atlas
3. Click "Browse Collections"
4. Find `users` collection
5. Find your user by email
6. Edit the document
7. Change `role` from `"donor"` to `"admin"`
8. Save
9. Logout and login again

## Troubleshooting

### Build Fails
- Check Netlify build logs
- Verify all dependencies in package.json
- Ensure Node version is 18+ (.nvmrc file)

### Functions Not Working
- Check Netlify Functions logs
- Verify environment variables are set
- Check MongoDB connection string
- Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas

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

## Environment Variables Reference

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank

# JWT Secret (generate a random 32+ character string)
JWT_SECRET=your_random_secret_key_min_32_characters

# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your16charapppassword
```

## Post-Deployment Checklist

- [ ] Site is accessible
- [ ] Registration works
- [ ] Email OTP is received
- [ ] Login works
- [ ] Donations can be recorded
- [ ] Dashboard shows data
- [ ] Admin user created
- [ ] Reports page accessible (admin)
- [ ] PDF export works
- [ ] Excel export works
- [ ] Change password works
- [ ] Forgot password works

## Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Rebuild on every push to main branch
- Deploy preview for pull requests
- Show build status

To update your app:
```bash
git add .
git commit -m "Your update message"
git push
```

Netlify will automatically rebuild and deploy!

## Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to configure DNS
4. SSL certificate is automatically provided

## Monitoring

- Netlify Analytics: Track traffic
- MongoDB Atlas: Monitor database usage
- Netlify Functions: Check logs for errors

## Security Best Practices

- Never commit .env file
- Use strong JWT_SECRET
- Rotate Gmail app password periodically
- Monitor for suspicious activity
- Keep dependencies updated
- Use HTTPS only (Netlify provides this)

## Support

For issues:
1. Check Netlify build logs
2. Check Netlify Functions logs
3. Check MongoDB Atlas logs
4. Review browser console errors
5. Check network tab in DevTools

## Success!

Your Blood Bank Management System is now live! 🎉

Share your Netlify URL with users and start managing blood donations!
