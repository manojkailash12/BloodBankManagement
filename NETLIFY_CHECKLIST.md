# ✅ Netlify Deployment Checklist

## Pre-Deployment

- [ ] All code committed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB database named `bloodbank`
- [ ] MongoDB Network Access set to 0.0.0.0/0
- [ ] Gmail 2FA enabled
- [ ] Gmail App Password generated (16 characters)
- [ ] JWT_SECRET generated (32+ characters)

## Netlify Setup

- [ ] Repository connected to Netlify
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Functions directory: `netlify/functions`

## Environment Variables (5 Required)

- [ ] `MONGODB_URI` = `mongodb+srv://user:pass@cluster.mongodb.net/bloodbank`
- [ ] `JWT_SECRET` = `your-32-character-secret-key`
- [ ] `EMAIL_USER` = `your-email@gmail.com`
- [ ] `EMAIL_PASS` = `your16charapppass` (no spaces)
- [ ] `NODE_ENV` = `production`

## Post-Deployment Testing

- [ ] Visit: `https://your-site.netlify.app/api` (should show API message)
- [ ] Visit: `https://your-site.netlify.app/netlify-test.html` (run tests)
- [ ] Test registration as Donor
- [ ] Check email for OTP
- [ ] Verify OTP and complete registration
- [ ] Test login
- [ ] Test dashboard access
- [ ] Test donations page
- [ ] Test reports with PDF export
- [ ] Test analytics charts
- [ ] Test find blood banks map
- [ ] Test change password
- [ ] Test forgot password
- [ ] Test registration as Receiver
- [ ] Test registration as Admin

## Troubleshooting

If registration fails:
1. [ ] Check Netlify function logs
2. [ ] Verify all 5 environment variables are set
3. [ ] Test MongoDB connection from Atlas
4. [ ] Verify Gmail App Password (no spaces)
5. [ ] Clear cache and redeploy

## Final Steps

- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)
- [ ] Create admin account
- [ ] Add sample data
- [ ] Share site URL with team
- [ ] Monitor function logs for 24 hours

---

**Quick Test URL**: `https://your-site.netlify.app/netlify-test.html`

**Function Logs**: Netlify Dashboard → Functions → api → View logs

**Redeploy**: Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy
