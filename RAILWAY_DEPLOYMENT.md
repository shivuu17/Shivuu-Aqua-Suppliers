# Railway Deployment Configuration

## Project Structure Overview

Your project is now properly structured for Railway deployment with separated backend and frontend:

```
/workspaces/buisness/
├── backend/                 # Express API Server
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Main server file (listens on PORT env variable)
│   ├── config/             # Configuration files
│   │   ├── db.js          # MongoDB connection
│   │   └── cloudinary.js  # Cloudinary setup
│   ├── middleware/         # Express middleware
│   │   ├── auth.js        # JWT authentication
│   │   └── errorHandler.js # Error handling
│   ├── models/            # Database models
│   │   ├── Admin.js       # Admin schema
│   │   ├── Inquiry.js     # Inquiry schema
│   │   └── Product.js     # Product schema
│   ├── routes/            # API routes
│   │   ├── admin.js       # Admin endpoints
│   │   ├── inquiry.js     # Inquiry endpoints
│   │   ├── product.js     # Product endpoints
│   │   └── upload.js      # File upload endpoints
│   ├── scripts/           # Utility scripts
│   │   ├── createAdmin.js # Create admin user
│   │   └── seedProducts.js # Seed products
│   └── utils/             # Utility functions
│       ├── email.js       # Email sending
│       └── supabaseClient.js # Supabase integration
│
├── frontend/              # React + Vite Frontend (SEPARATED - for future frontend deployment)
│   ├── package.json      # Frontend dependencies
│   ├── index.html        # HTML entry point
│   ├── vite.config.js    # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS config
│   ├── postcss.config.js # PostCSS config
│   ├── src/
│   │   ├── main.jsx      # React entry point
│   │   ├── App.jsx       # Root component
│   │   ├── index.css     # Global styles
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── dist/             # Production build output
│
├── railway.json          # Railway deployment configuration
├── .gitignore           # Updated for new structure
├── package.json         # Root package.json (optional, for monorepo management)
└── start.sh             # Deployment script
```

## Backend Configuration

### Key Features:

✅ **Listen on PORT environment variable** (Railway sets this automatically)
✅ **CORS enabled for all origins** (needed for Railway deployment)
✅ **Proper error handling middleware**
✅ **Rate limiting enabled**
✅ **MongoDB connection from MONGODB_URI env**

### Backend package.json

```json
{
  "name": "shivuu-aqua-backend",
  "version": "1.0.0",
  "description": "Backend server for Shivuu Aqua Supplies",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seedProducts.js",
    "create-admin": "node scripts/createAdmin.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1",
    "cloudinary": "^2.7.0",
    "multer": "^2.0.2",
    "nodemailer": "^7.0.7",
    "express-rate-limit": "^7.1.5",
    "@supabase/supabase-js": "^2.45.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### Backend server.js Configuration

Key improvements for Railway:

```javascript
// ✅ CORS Configuration - Allow all origins
const corsOptions = {
  origin: '*',
  credentials: false,
};
app.use(cors(corsOptions));

// ✅ Listen on PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ✅ Trust proxy for rate limiting (Railway sets X-Forwarded-For)
app.set('trust proxy', 1);
```

## Railway Deployment Configuration

### railway.json

This file tells Railway how to build and start your app:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && npm start"
  }
}
```

**What this does:**
- Uses NIXPACKS builder (supports Node.js natively)
- Starts with `npm start` from the backend directory
- NIXPACKS automatically detects the backend/package.json and installs dependencies

## Environment Variables (Set in Railway)

Configure these in Railway dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shivuu-aqua
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@shivuuaqua.com
ADMIN_DEFAULT_PASSWORD=secure_password
NODE_ENV=production
```

## Deployment Steps

### Step 1: Prepare for Deployment

Make sure all old references are removed:
- The old `client/` and `server/` folders can be deleted after verification
- New structure is in `backend/` and `frontend/`

### Step 2: Connect to Railway

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Connect your GitHub repository
4. Railway will automatically detect `railway.json`

### Step 3: Configure Environment Variables

1. In Railway dashboard, go to "Variables"
2. Add all the environment variables listed above
3. Make sure MongoDB connection string is correct

### Step 4: Deploy

1. Commit and push your changes:
```bash
git add .
git commit -m "Restructure project for Railway deployment"
git push origin main
```

2. Railway will automatically:
   - Build: `npm install` in backend directory
   - Start: `npm start` (runs `node server.js`)
   - Listen on assigned PORT
   - Set up networking and SSL

### Step 5: Verify Deployment

Check if API is running:
```
https://your-railway-url.railway.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Frontend Deployment (Future)

The `frontend/` directory is now separate and ready for independent deployment to:
- Vercel (recommended for React)
- Netlify
- Railway (as separate service)

To deploy frontend separately:
1. Build: `cd frontend && npm run build`
2. Output: `frontend/dist/`
3. Deploy `dist/` folder to your hosting

## Notes for Railway

✅ **Separate backend directory** - Railway will find and run backend code
✅ **Railway.json** - Explicitly tells Railway how to build and start
✅ **Environment variables** - All configured via Railway dashboard
✅ **Port binding** - Backend listens on PORT env variable (Railway standard)
✅ **CORS enabled** - API accepts requests from anywhere
✅ **Node modules not committed** - Updated .gitignore

## Troubleshooting

If deployment fails:

1. **Build error**: Check backend/package.json exists
2. **Start error**: Verify `npm start` works locally: `cd backend && npm start`
3. **Connection error**: Check MONGODB_URI in Railway variables
4. **Port error**: Railway automatically assigns PORT, app must use it

## Quick Commands

```bash
# Install backend dependencies
cd backend && npm install

# Run backend locally
cd backend && npm start

# Create admin user
cd backend && npm run create-admin

# Seed products
cd backend && npm run seed
```

---

**Status**: ✅ Ready for Railway deployment
**Last Updated**: 2024-01-19
