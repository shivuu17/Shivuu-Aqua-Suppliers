# Deployment Guide

This guide covers deploying the Shivuu Aqua Supplies application to production.

## Architecture Overview

- **Frontend:** Deployed on Vercel (React + Vite)
- **Backend:** Deployed on Railway (Node.js + Express)
- **Database:** MongoDB Atlas (primary) with optional Supabase replication
- **File Storage:** Cloudinary (Image hosting)

## Prerequisites

1. GitHub account (code repository)
2. Vercel account (frontend hosting)
3. Railway account (backend hosting)
4. MongoDB Atlas account (database)
5. Supabase account (optional inquiry replication)
6. Cloudinary account (image storage)

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

## Part 2: Backend Deployment (Railway)

### 1. Prepare Backend for Deployment

- Ensure `server/server.js` loads dotenv (already done) and that `MONGODB_URI` is set.
- Add your production frontend domain(s) to `ALLOWED_ORIGINS` (comma-separated, supports `https://*.vercel.app`).
- If you want inquiry data mirrored to Supabase, prepare `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

### 2. Create Railway Account

1. Go to https://railway.app and sign up with GitHub.
2. Authorize Railway to access your repository.

### 3. Create a New Service

1. Click "New Project" → "Deploy from Repo" and pick this repository.
2. In service settings, set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - Railway sets `PORT` automatically; the server reads it.
3. Choose your preferred region closest to users.

### 4. Add Environment Variables

Add the following (match `.env.example`):

```
NODE_ENV=production
PORT=8080
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
ADMIN_DEFAULT_PASSWORD=change_me
BUSINESS_PHONE=+919876543210
BUSINESS_WHATSAPP=919876543210
BUSINESS_EMAIL=contact@shivuuaqua.com
CLIENT_URL=https://your-frontend.vercel.app
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://*.vercel.app,http://localhost:5173

# Optional: Supabase replication
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service_role_key_from_supabase
```

### 5. Deploy

1. Click "Deploy" and wait for the service to build.
2. Copy the public URL (e.g., `https://shivuu-aqua-production.up.railway.app`).

### 6. Initialize Database

- From the Railway service "Shell", run:
  ```bash
  npm run create-admin
  npm run seed
  ```

### 7. Optional: Supabase replication

1. In Supabase, create a new project.
2. Run this SQL in the SQL editor to create the mirror table:
   ```sql
   create table if not exists inquiries (
     id bigserial primary key,
     mongo_id text,
     name text,
     business_name text,
     phone text,
     city text,
     bottle_size text,
     quantity text,
     address text,
     message text,
     label_style text,
     logo_url text,
     status text,
     created_at timestamptz default now()
   );
   ```
3. Grab the **Project URL** and **Service Role** key from Settings → API and add them to Railway as `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Every new inquiry will now be copied to Supabase in addition to MongoDB.

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
   - **Value:** `https://your-railway-backend-url.up.railway.app/api`

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

1. Go back to your Railway service
2. Update `CLIENT_URL` and `ALLOWED_ORIGINS` to include your Vercel URL
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

### Backend Domain (Railway)

1. In Railway service settings, open the "Domains" section
2. Add your subdomain (e.g., api.shivuuaqua.com)
3. Update DNS records as instructed

---

## Monitoring and Maintenance

### Monitor Application Health

**Railway:**
- Check logs in the Railway service dashboard
- Set up alerts/metrics in Railway or via a status ping

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
4. Railway auto-deploys backend on push

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
- Railway: Free (usage-limited; may sleep when idle)
- MongoDB Atlas: Free (512MB storage)
- Supabase: Free (optional replication)
- Cloudinary: Free (25 credits/month)

**Paid Options (For production traffic):**
- Vercel Pro: $20/month
- Railway starter tiers: ~$5–$15/month depending on plan
- MongoDB Atlas: From $9/month
- Supabase Pro: From $25/month (optional)
- Cloudinary: Pay as you go

---

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS (auto with Vercel/Railway)
- [ ] Set secure CORS origins
- [ ] Limit MongoDB Atlas network access in production
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting (already implemented)
- [ ] Regular dependency updates

---

## Support

For deployment issues:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Supabase Docs: https://supabase.com/docs

---

**Congratulations! Your application is now live! 🎉**
