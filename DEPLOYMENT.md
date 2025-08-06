# Cinepax Booking System - Deployment Guide

This guide covers multiple deployment options for your Cinepax booking system.

## Prerequisites

Before deploying, ensure you have:
- MongoDB Atlas database setup with connection string
- Gmail app password for email functionality (if using email features)
- Environment variables configured

## Deployment Options

### 1. Railway (Recommended for Full-Stack Apps)

Railway offers excellent support for Node.js applications with automatic builds.

**Steps:**
1. Go to [Railway](https://railway.app/) and sign up
2. Connect your GitHub repository: `https://github.com/Mirza1358/cinepax-booking-system`
3. Select "Deploy from GitHub repo"
4. Railway will automatically detect your `railway.json` and `nixpacks.toml` configurations
5. Add environment variables in Railway dashboard:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_gmail_email
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=production
   ```
6. Deploy and get your live URL

### 2. Render (Free Tier Available)

**Backend Deployment:**
1. Go to [Render](https://render.com/) and sign up
2. Create a new "Web Service"
3. Connect your GitHub repo
4. Use these settings:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment: Node
5. Add environment variables in Render dashboard

**Frontend Deployment:**
1. Create a new "Static Site" on Render
2. Use these settings:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`

### 3. Vercel (Frontend) + Railway/Render (Backend)

**Frontend on Vercel:**
1. Go to [Vercel](https://vercel.com/) and import your repo
2. Set root directory to `client`
3. Vercel will auto-detect Vite configuration
4. Update the `vercel.json` file with your backend URL

**Backend on Railway/Render:**
Follow the Railway or Render backend steps above.

### 4. Docker Deployment

If you prefer containerized deployment:

**Build and run locally:**
```bash
# Build the Docker image
docker build -t cinepax-app .

# Run the container
docker run -p 5050:5050 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e JWT_SECRET="your_jwt_secret" \
  cinepax-app
```

**Deploy to cloud platforms:**
- **Railway:** Push the Dockerfile to your repo, Railway will auto-detect
- **Google Cloud Run:** `gcloud run deploy --source .`
- **AWS ECS:** Create a task definition with your Docker image
- **DigitalOcean App Platform:** Connect repo and select Dockerfile

### 5. Netlify (Frontend) + Separate Backend

**Frontend on Netlify:**
1. Connect your repo to Netlify
2. Set build command: `cd client && npm run build`
3. Set publish directory: `client/dist`
4. Add environment variables pointing to your backend URL

## Environment Variables

Required environment variables for production:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cinepax

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email (if using email features)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Environment
NODE_ENV=production
PORT=5050
```

## Post-Deployment Steps

1. **Test the API endpoints:**
   - Health check: `https://your-domain.com/api/health`
   - Database test: `https://your-domain.com/api/test-db`

2. **Update CORS settings** in `server/server.js` if needed:
   ```javascript
   app.use(cors({ 
     origin: ['https://your-frontend-domain.com', 'https://your-backend-domain.com'],
     credentials: true 
   }));
   ```

3. **Update frontend API calls** to use production URLs instead of localhost

4. **Set up monitoring:**
   - Enable health checks on your hosting platform
   - Monitor database connections
   - Set up error tracking (optional: Sentry, LogRocket)

## Troubleshooting

**Common Issues:**

1. **MongoDB Connection Issues:**
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check connection string format
   - Verify username/password

2. **CORS Errors:**
   - Update CORS configuration in server
   - Ensure frontend is making requests to correct backend URL

3. **Build Failures:**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check for case-sensitive file imports

4. **Environment Variables:**
   - Verify all required env vars are set
   - Check for typos in variable names
   - Ensure no spaces around = in .env files

## Recommended Setup

For the best development-to-production workflow:

1. **Backend:** Railway or Render
2. **Frontend:** Vercel or Netlify
3. **Database:** MongoDB Atlas
4. **Domain:** Custom domain from your hosting provider

## Cost Estimation

- **Railway:** Free tier available, paid plans start at $5/month
- **Render:** Free tier available, paid plans start at $7/month
- **Vercel:** Free tier for personal projects
- **Netlify:** Free tier available
- **MongoDB Atlas:** Free tier (512MB) available

## Support

If you encounter issues during deployment:
1. Check the platform-specific logs
2. Verify environment variables
3. Test locally first with production environment variables
4. Check this repository's issues section

---

Good luck with your deployment! 🚀 