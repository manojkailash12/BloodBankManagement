# 🔧 Quick Fix Guide - Registration Failed on Netlify

## Problem: "Registration failed" after deployment

### ✅ Solution (5 Steps)

#### 1. Check Environment Variables in Netlify
Go to: **Netlify Dashboard → Site Settings → Environment Variables**

Verify these 5 variables exist:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/bloodbank
JWT_SECRET = your-super-secret-jwt-key-at-least-32-characters-long
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = abcdefghijklmnop (16 chars, NO SPACES)
NODE_ENV = production
```

#### 2. Common Mistakes to Fix

❌ **MONGODB_URI missing `/bloodbank`**
```
Wrong: mongodb+srv://user:pass@cluster.mongodb.net/
Right: mongodb+srv://user:pass@cluster.mongodb.net/bloodbank
```

❌ **EMAIL_PASS has spaces**
```
Wrong: abcd efgh ijkl mnop
Right: abcdefghijklmnop
```

❌ **JWT_SECRET too short**
```
Wrong: secret123
Right: my-super-secret-jwt-key-at-least-32-characters-long
```

#### 3. MongoDB Atlas Network Access
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Add IP: `0.0.0.0/0` (Allow from anywhere)
4. Click "Confirm"

#### 4. Redeploy with Cache Clear
1. Go to Netlify Dashboard
2. Click "Deploys" tab
3. Click "Trigger deploy"
4. Select "Clear cache and deploy site"
5. Wait 2-3 minutes

#### 5. Test the Deployment
Visit: `https://your-site.netlify.app/netlify-test.html`

Click "Test Registration" button

---

## Still Not Working?

### Check Function Logs
1. Netlify Dashboard → Functions
2. Click "api" function
3. View real-time logs
4. Look for error messages

### Common Error Messages

**"Database connection failed"**
- Fix: Check MONGODB_URI and MongoDB Atlas network access

**"Email sending failed"**
- Fix: Verify EMAIL_USER and EMAIL_PASS (Gmail App Password)

**"Invalid token"**
- Fix: Update JWT_SECRET to 32+ characters and redeploy

**"Cannot find module"**
- Fix: Clear cache and redeploy

---

## Test Locally First

```bash
# 1. Update .env file with correct values
# 2. Install dependencies
npm install

# 3. Start backend
npm run server

# 4. In new terminal, start frontend
npm run dev

# 5. Test registration at http://localhost:5173
```

If it works locally but not on Netlify:
- Environment variables are different
- Copy exact values from `.env` to Netlify

---

## Emergency Contact

If nothing works:
1. Check all 5 environment variables
2. Verify MongoDB Atlas allows 0.0.0.0/0
3. Generate new Gmail App Password
4. Clear cache and redeploy
5. Wait 5 minutes and test again

---

**Quick Test**: `https://your-site.netlify.app/api`
Should show: `{"message": "Blood Bank API is running", "status": "healthy"}`
