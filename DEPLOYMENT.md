# Deployment Guide

This guide covers deploying the Shivuu Aqua Supplies application to production.

## Architecture Overview

- **Frontend:** Deployed on Vercel (React + Vite)
- **Backend:** Deployed on Render.com (Node.js + Express)
- **Database:** MongoDB Atlas (Cloud Database)
- **File Storage:** Cloudinary (Image hosting)

## Prerequisites

1. GitHub account (code repository)
2. Vercel account (frontend hosting)
3. Render account (backend hosting)
4. MongoDB Atlas account (database)
5. Cloudinary account (image storage)

---

## Part 1: Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Click "Build a Database"
4. Choose "FREE" tier (M0)
5. Select your preferred region
6. Click "Create Cluster"

### 2. Configure Database Access

1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Set role to "Read and write to any database"
6. Click "Add User"

### 3. Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to your server IPs
4. Click "Confirm"

### 4. Get Connection String

1. Go to "Databases"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `shivuu-aqua`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shivuu-aqua?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment (Render.com)

### 1. Prepare Backend for Deployment

Ensure your `server/server.js` has this at the top:
```javascript
import dotenv from 'dotenv';
dotenv.config();
```

### 2. Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 3. Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `shivuu-aqua-api` (or your choice)
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your branch)
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid for better performance)

### 4. Add Environment Variables

Click "Environment" and add all variables from `.env.example`:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_random_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@shivuuaqua.com
BUSINESS_PHONE=+919876543210
BUSINESS_WHATSAPP=919876543210
BUSINESS_EMAIL=contact@shivuuaqua.com
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Note:** You'll update `CLIENT_URL` after deploying the frontend.

### 5. Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://shivuu-aqua-api.onrender.com`

### 6. Initialize Database

After deployment, use Render Shell to run scripts:

1. In Render dashboard, click "Shell" tab
2. Run:
   ```bash
   npm run create-admin
   npm run seed
   ```

---

## Part 3: Frontend Deployment (Vercel)

### 1. Update API Configuration

Before deploying, update the API base URL for production.

Edit `client/src/services/api.js`:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// ... rest of the code
```

### 2. Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Click "Add New Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add Environment Variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-render-backend-url.onrender.com/api`

5. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from client directory
cd client
vercel --prod
```

### 4. Get Frontend URL

After deployment, Vercel will provide a URL like:
`https://shivuu-aqua.vercel.app`

### 5. Update Backend CORS

1. Go back to Render dashboard
2. Update `CLIENT_URL` environment variable to your Vercel URL
3. Redeploy the backend service

---

## Part 4: Post-Deployment Setup

### 1. Test the Deployment

Visit your frontend URL and test:
- [ ] Home page loads
- [ ] Navigation works
- [ ] Products page displays
- [ ] Custom label designer works
- [ ] Inquiry form submits successfully
- [ ] Admin login works
- [ ] Admin dashboard displays inquiries
- [ ] WhatsApp button works

### 2. Create Production Admin

1. Login to admin panel with default credentials
2. Create a new admin with a strong password
3. Delete or change the default admin password

### 3. Add Real Products

Use the admin panel to add actual products with:
- Real pricing
- Product images (upload to Cloudinary)
- Accurate delivery times

### 4. Configure Email Notifications

Test the inquiry form to ensure emails are being sent.

### 5. Update Business Information

1. Update phone numbers and emails in environment variables
2. Verify WhatsApp integration works
3. Update contact information in frontend constants

---

## Part 5: Custom Domain (Optional)

### Frontend Domain (Vercel)

1. Buy a domain (e.g., shivuuaqua.com)
2. In Vercel project settings, go to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

### Backend Domain (Render)

1. In Render dashboard, go to "Settings" → "Custom Domain"
2. Add subdomain (e.g., api.shivuuaqua.com)
3. Update DNS records as instructed

---

## Monitoring and Maintenance

### Monitor Application Health

**Render:**
- Check logs in Render dashboard
- Set up alerts for downtime

**Vercel:**
- Monitor deployments
- Check analytics

**MongoDB Atlas:**
- Monitor database usage
- Set up alerts for storage limits

### Backup Strategy

1. **Database:** MongoDB Atlas provides automatic backups
2. **Code:** Maintained in GitHub
3. **Images:** Cloudinary maintains uploaded files

### Updating the Application

1. Make changes in your local repository
2. Commit and push to GitHub
3. Vercel auto-deploys frontend on push
4. Render auto-deploys backend on push

To disable auto-deploy, configure in platform settings.

---

## Troubleshooting

### Backend Not Connecting to Frontend

- Check CORS configuration
- Verify `CLIENT_URL` in backend environment
- Verify `VITE_API_URL` in frontend environment

### Database Connection Issues

- Check MongoDB Atlas whitelist includes 0.0.0.0/0
- Verify connection string is correct
- Check database user permissions

### Email Not Sending

- Verify Gmail App Password is set correctly
- Check email service is not blocked

### Images Not Uploading

- Verify Cloudinary credentials
- Check Cloudinary storage limits

---

## Cost Estimation

**Free Tier (Good for starting):**
- Vercel: Free (includes custom domain)
- Render: Free (with limitations, sleeps after 15 min inactivity)
- MongoDB Atlas: Free (512MB storage)
- Cloudinary: Free (25 credits/month)

**Paid Options (For production traffic):**
- Vercel Pro: $20/month
- Render Starter: $7/month
- MongoDB Atlas: From $9/month
- Cloudinary: Pay as you go

---

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS (auto with Vercel/Render)
- [ ] Set secure CORS origins
- [ ] Limit MongoDB Atlas network access in production
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting (already implemented)
- [ ] Regular dependency updates

---

## Support

For deployment issues:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

---

**Congratulations! Your application is now live! 🎉**
