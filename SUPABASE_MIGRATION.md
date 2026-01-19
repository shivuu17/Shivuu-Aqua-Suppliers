# Supabase Migration Guide

## ✅ Migration Complete!

Your Shivuu Aqua Suppliers backend has been fully migrated from MongoDB to Supabase PostgreSQL.

## What Changed:

### Removed:
- ❌ `mongoose` dependency
- ❌ MongoDB models (`backend/models/`)
- ❌ `MONGODB_URI` environment variable

### Added:
- ✅ Supabase PostgreSQL database
- ✅ SQL schema file: `backend/supabase-schema.sql`
- ✅ Updated routes to use Supabase client
- ✅ `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables

---

## Setup Instructions:

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `shivuu-aqua-suppliers`
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to you
5. Wait for project to be created (~2 minutes)

### 2. Run SQL Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste the entire contents of `backend/supabase-schema.sql`
4. Click **"Run"**
5. You should see: "Success. No rows returned"

This creates:
- `products` table
- `inquiries` table  
- `admins` table
- Sample products data

### 3. Get Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:

   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Service Role Key** (starts with `eyJ...`, under "service_role")

### 4. Update Environment Variables

#### For Local Development:
Create a `.env` file in `/backend/` directory:

```bash
# Supabase (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT
JWT_SECRET=your_random_secret_key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Admin
ADMIN_EMAIL=admin@shivuuaqua.com
ADMIN_DEFAULT_PASSWORD=admin123
```

#### For Railway Deployment:
Add these environment variables in Railway dashboard:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `NODE_ENV=production`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`

### 5. Install Dependencies

```bash
cd backend
npm install
```

### 6. Create Admin User

```bash
npm run create-admin
```

This creates an admin user:
- Username: `admin`
- Password: From `ADMIN_DEFAULT_PASSWORD` env (default: `admin123`)

**⚠️ IMPORTANT:** Change the password after first login!

### 7. Test Locally

```bash
npm run dev
```

Visit: `http://localhost:5000/api/health`

You should see: `{"status":"ok","message":"Server is running with Supabase"}`

### 8. Deploy to Railway

```bash
git add .
git commit -m "Migrate to Supabase"
git push
```

Railway will automatically redeploy with Supabase!

---

## API Changes:

### Field Name Changes (snake_case in DB, camelCase in API):

| MongoDB Field | Supabase Field | API Field (unchanged) |
|--------------|----------------|---------------------|
| `_id` | `id` (UUID) | `id` |
| `businessName` | `business_name` | `businessName` |
| `bottleSize` | `bottle_size` | `bottleSize` |
| `logoUrl` | `logo_url` | `logoUrl` |
| `labelStyle` | `label_style` | `labelStyle` |
| `priceRange` | `price_range` | `priceRange` |
| `MOQ` | `moq` | `MOQ` |
| `imageUrl` | `image_url` | `imageUrl` |
| `deliveryTime` | `delivery_time` | `deliveryTime` |
| `createdAt` | `created_at` | `createdAt` |

**The API still uses camelCase** - the backend handles the conversion automatically!

---

## Benefits of Supabase:

✅ **Free tier**: 500MB database + 1GB file storage  
✅ **No separate MongoDB Atlas** needed  
✅ **Built-in auth** (can be used instead of JWT in future)  
✅ **Real-time subscriptions** (for live updates)  
✅ **Auto-generated REST API**  
✅ **PostgreSQL** (more robust than MongoDB)  
✅ **Easier deployment** (no connection string issues)  

---

## Troubleshooting:

### Error: "Missing Supabase credentials"
- Make sure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in `.env`

### Error: "relation 'products' does not exist"
- Run the SQL schema in Supabase SQL Editor

### Admin login not working
- Make sure you ran `npm run create-admin` after setting up Supabase

### Can't connect to Supabase
- Check your Supabase project is active (not paused)
- Verify credentials are correct (no extra spaces)

---

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
