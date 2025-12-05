# Google Maps API Setup Guide

## Overview

The "Find Blood Banks" feature uses Google Maps API to show nearby blood banks on an interactive map. Users can:
- See their current location
- Find blood banks within 5km radius
- View blood bank details (name, address, phone, ratings)
- Get directions to blood banks
- Call blood banks directly

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Enter project name: "Blood Bank Management"
5. Click "Create"

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for and enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API** (optional, for address lookup)

## Step 3: Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key (it will look like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

## Step 4: Restrict API Key (Recommended for Security)

### Application Restrictions:
1. Click on your API key to edit
2. Under "Application restrictions":
   - For development: Choose "None"
   - For production: Choose "HTTP referrers (web sites)"
   - Add your Netlify domain: `https://your-app.netlify.app/*`
   - Add localhost for testing: `http://localhost:*`

### API Restrictions:
1. Under "API restrictions", select "Restrict key"
2. Select these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API

3. Click "Save"

## Step 5: Add API Key to Your Project

### For Local Development:

Add to your `.env` file:
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### For Netlify Deployment:

1. Go to Netlify Dashboard
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Click "Add a variable"
5. Key: `VITE_GOOGLE_MAPS_API_KEY`
6. Value: Your Google Maps API key
7. Click "Save"

## Step 6: Enable Billing (Required)

Google Maps API requires a billing account, but includes:
- **$200 free credit per month**
- Most small to medium apps stay within free tier

To enable billing:
1. Go to "Billing" in Google Cloud Console
2. Click "Link a billing account"
3. Follow the steps to add a payment method
4. Don't worry - you won't be charged unless you exceed $200/month

### Free Tier Limits:
- Maps JavaScript API: 28,000 loads per month free
- Places API: $200 credit covers ~40,000 requests
- Most blood bank apps will stay well within free limits

## Step 7: Test the Feature

1. Restart your development server
2. Login to the app
3. Click "🗺️ Find Blood Banks" in navigation
4. Allow location access when prompted
5. You should see:
   - Your location marked in blue
   - Nearby blood banks marked in red
   - List of blood banks on the right
   - Click any bank to see details

## Troubleshooting

### "This page can't load Google Maps correctly"
- Check if API key is correct
- Verify Maps JavaScript API is enabled
- Check if billing is enabled
- Clear browser cache

### "Google Maps API error: RefererNotAllowedMapError"
- Add your domain to HTTP referrers in API key restrictions
- For localhost, add: `http://localhost:*`

### No blood banks showing
- Check if Places API is enabled
- Verify location permissions are granted
- Try a different location (some areas may have fewer results)

### "Geocoding Service: This API project is not authorized"
- Enable Geocoding API in Google Cloud Console
- Wait a few minutes for changes to propagate

## API Usage Monitoring

Monitor your API usage:
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Dashboard"
3. View usage charts for each API
4. Set up billing alerts if needed

## Cost Optimization Tips

1. **Restrict API Key**: Only allow your domains
2. **Enable only needed APIs**: Don't enable unnecessary APIs
3. **Cache Results**: The app caches map data to reduce API calls
4. **Set Usage Quotas**: Set daily quotas in Google Cloud Console
5. **Monitor Usage**: Check usage regularly

## Security Best Practices

1. **Never commit API key to Git**: Use environment variables
2. **Restrict by domain**: Add HTTP referrer restrictions
3. **Restrict by API**: Only enable needed APIs
4. **Rotate keys**: Change API key if compromised
5. **Monitor usage**: Watch for unusual spikes

## Alternative: Use Without API Key

If you don't want to use Google Maps API, you can:
1. Remove the Find Blood Banks feature
2. Use OpenStreetMap (free, no API key needed)
3. Use Mapbox (has free tier)

To remove the feature:
1. Remove "Find Blood Banks" link from Navbar
2. Remove the route from App.jsx
3. Delete src/pages/FindBloodBanks.jsx

## Support

- Google Maps Platform Documentation: https://developers.google.com/maps/documentation
- Places API Documentation: https://developers.google.com/maps/documentation/places/web-service
- Billing FAQ: https://cloud.google.com/maps-platform/pricing
- Support: https://cloud.google.com/support

## Summary

✅ Create Google Cloud Project
✅ Enable Maps JavaScript API and Places API
✅ Create and restrict API key
✅ Enable billing (free $200/month credit)
✅ Add API key to .env and Netlify
✅ Test the feature

**Estimated Setup Time**: 10-15 minutes
**Monthly Cost**: $0 (within free tier for most apps)
