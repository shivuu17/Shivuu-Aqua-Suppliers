# 🔒 Environment Variables Security Guide

## Overview
This project uses environment variables to manage sensitive configuration. Never commit `.env` files to version control.

## Files
- **.env** - Local development (⚠️ NEVER commit to git)
- **.env.example** - Template for developers (✅ Safe to commit)
- **.gitignore** - Configured to ignore `.env` files ✓

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
```

Then edit `.env` and fill in:

#### Supabase Configuration
1. Go to [Supabase Console](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy:
   - `Project URL` → `SUPABASE_URL`
   - `Service Role secret` → `SUPABASE_SERVICE_ROLE_KEY`

#### JWT Secret (Generate New)
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

#### Cloudinary Configuration
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Go to Settings → API Keys
3. Copy:
   - Cloud Name → `CLOUDINARY_CLOUD_NAME`
   - API Key → `CLOUDINARY_API_KEY`
   - API Secret → `CLOUDINARY_API_SECRET`

#### Gmail App Password
1. Enable 2-Factor Authentication on Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select Mail and Windows Computer
4. Copy the generated password → `EMAIL_PASS`
⚠️ Use app-specific password, NOT your main account password

#### Admin Configuration
- Set `ADMIN_DEFAULT_PASSWORD` to a temporary password
- ⚠️ **IMPORTANT**: After first login, change it in the dashboard
- For production, use bcrypt to hash passwords

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
```

Update `VITE_API_URL` based on environment:
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-railway-backend.up.railway.app/api`

## Deployment Checklist

### Before Deploying to Production

- [ ] Generate new Supabase keys (don't use dev keys)
- [ ] Generate new JWT secret
- [ ] Generate new Cloudinary credentials
- [ ] Change admin default password
- [ ] Update `ALLOWED_ORIGINS` with production domain(s)
- [ ] Set `NODE_ENV=production`
- [ ] Update backend API URLs in frontend `.env`
- [ ] Test CORS configuration
- [ ] Verify email credentials work
- [ ] Check database migrations are complete

### Environment Variables Per Platform

#### Railway.app (Backend)
```
PORT=5000
NODE_ENV=production
SUPABASE_URL=<your-production-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<your-production-key>
JWT_SECRET=<secure-generated-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-business-email>
EMAIL_PASS=<app-specific-password>
ADMIN_EMAIL=<admin-email>
ADMIN_DEFAULT_PASSWORD=<secure-password>
BUSINESS_PHONE=<your-phone>
BUSINESS_WHATSAPP=<your-whatsapp>
BUSINESS_EMAIL=<your-email>
CLIENT_URL=https://yourdomain.vercel.app
ALLOWED_ORIGINS=https://yourdomain.vercel.app,https://www.yourdomain.com
```

#### Vercel (Frontend)
```
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

## Security Best Practices

✅ **DO**
- Generate strong random secrets
- Use app-specific passwords for email
- Rotate secrets regularly
- Keep `.env` in `.gitignore`
- Use different credentials for dev/prod
- Never share `.env` files in chats/emails
- Store secrets in platform-specific vaults (Railway, Vercel)

❌ **DON'T**
- Commit `.env` to git
- Share secrets in code comments
- Use the same secrets across environments
- Use weak or predictable passwords
- Log sensitive values
- Hardcode credentials in source code

## Troubleshooting

### "Supabase connection failed"
- Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Verify API key hasn't expired
- Check network connectivity

### "Email not sending"
- Verify Gmail app password (not main password)
- Check "Less secure app access" is disabled (use app passwords instead)
- Verify `EMAIL_USER` matches Gmail account

### "Cloudinary upload fails"
- Verify API credentials are correct
- Check Cloudinary account isn't rate-limited
- Verify file size within Cloudinary limits

## References
- [Supabase Docs](https://supabase.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Nodemailer Gmail Setup](https://nodemailer.com/smtp/gmail/)
- [12 Factor App - Config](https://12factor.net/config)
