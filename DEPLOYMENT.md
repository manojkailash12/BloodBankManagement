# Deployment Guide for Netlify

## Prerequisites

1. GitHub account
2. Netlify account (free tier works)
3. MongoDB Atlas account (free tier works)

## Step-by-Step Deployment

### 1. Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/bloodbank`)
6. Replace `<password>` with your actual password
7. Add `/bloodbank` at the end to specify the database name

### 2. Setup Gmail for Email

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (remove spaces)

### 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Blood Bank Management System"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 4. Deploy to Netlify

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Build settings (should auto-detect from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Show advanced" → "New variable" and add:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = any random secure string (e.g., use a password generator)
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = your Gmail app password
6. Click "Deploy site"

### 5. Post-Deployment

1. Wait for deployment to complete (2-5 minutes)
2. Netlify will provide a URL like: `https://your-app-name.netlify.app`
3. Visit the URL and test registration
4. Check email for OTP

### 6. Create Admin User

After registering a user, make them admin:

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Find the `users` collection
4. Find your user by email
5. Click "Edit" and change `role` from `"donor"` to `"admin"`
6. Save changes
7. Log out and log back in to see Reports section

## Troubleshooting

### Email not sending
- Verify Gmail app password is correct (no spaces)
- Check if 2FA is enabled on Google account
- Try generating a new app password

### Database connection issues
- Verify MongoDB connection string is correct
- Check if IP whitelist includes `0.0.0.0/0` (allow all) in MongoDB Atlas
- Ensure database user has read/write permissions

### Build failures
- Check Netlify build logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Functions not working
- Check Netlify Functions logs
- Verify API routes match frontend calls
- Ensure MongoDB connection is established

## Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to configure DNS

## Environment Variables Reference

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank
JWT_SECRET=your_random_secret_key_min_32_chars
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_char_app_password
```

## Monitoring

- Check Netlify Analytics for traffic
- Monitor MongoDB Atlas for database usage
- Review Netlify Functions logs for errors

## Updates

To update your deployed app:

```bash
git add .
git commit -m "Your update message"
git push
```

Netlify will automatically rebuild and deploy.
