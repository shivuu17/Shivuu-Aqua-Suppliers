# 🚀 Production Deployment Guide

## Overview

This guide walks you through deploying the complete Shivuu Aqua Supplies stack:
- **Frontend** → Vercel
- **Backend** → Railway
- **Database** → Supabase (already cloud-hosted)

---

## Pre-Deployment Checklist

### Local Verification
- [ ] Backend runs locally without errors
- [ ] Frontend runs locally without errors
- [ ] Products load from database
- [ ] Can submit inquiries
- [ ] Admin panel works
- [ ] All tests pass

### Configuration Verification
- [ ] `backend/.env` has all required keys
- [ ] `frontend/.env` has `VITE_API_URL`
- [ ] Supabase credentials valid
- [ ] Cloudinary credentials valid
- [ ] Email configuration working

---

## Backend Deployment (Railway)

### Step 1: Prepare Backend
```bash
cd /workspaces/buisness/backend

# Ensure all changes are committed
git add .
git commit -m "Backend production ready"
git push origin main
```

### Step 2: Create Railway Project
1. Visit https://railway.app
2. Sign in with GitHub account
3. Create new project from GitHub
4. Select the buisness repository
5. Select `backend` directory as root

### Step 3: Configure Environment Variables

Add these in Railway dashboard:

```env
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://dcavrnwyjrqomscmpfmn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=5XGCoBJ35N2cOQTMzTwtLC7hig9kQPgHR7o6qJ+ZCz/R...
CLOUDINARY_CLOUD_NAME=ddz3vjfz3
CLOUDINARY_API_KEY=344872432896576
CLOUDINARY_API_SECRET=rqVbo5Jsk5Jp9oQMErOAgQnVvJs
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=ShivuuAquaSuppliers@gmail.com
EMAIL_PASS=itgw nzrj icjn tcvm
```

### Step 4: Deploy

- [ ] Review all environment variables
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note the Railway URL (e.g., `https://api-xyz.railway.app`)

### Step 5: Verify Backend Deployment

```bash
# Test the production endpoint
curl https://<railway-url>/api/health

# Should return:
# {"status":"ok","message":"Server is running with Supabase"}
```

---

## Frontend Deployment (Vercel)

### Step 1: Update Backend URL

Update `frontend/.env` with the Railway URL:

```env
VITE_API_URL=https://<railway-url>/api
```

Example:
```env
VITE_API_URL=https://api-xyz.railway.app/api
```

### Step 2: Commit Changes
```bash
cd /workspaces/buisness/frontend

git add .env
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Deploy to Vercel

1. Visit https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select the buisness repository
5. Configure:
   - **Root Directory:** frontend
   - **Framework:** React
   - **Build Command:** npm run build
   - **Output Directory:** dist

### Step 4: Add Environment Variables

In Vercel project settings, add:
```env
VITE_API_URL=https://<railway-url>/api
```

### Step 5: Deploy

- [ ] Review all settings
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note the Vercel URL (e.g., `https://shivuu-aqua.vercel.app`)

---

## Post-Deployment Testing

### Test Frontend

1. Open the Vercel URL in browser
2. Verify:
   - [ ] Page loads without blank screen
   - [ ] No console errors (F12)
   - [ ] Navbar renders correctly
   - [ ] Footer visible
   - [ ] All pages accessible

### Test Products Display

1. Navigate to Products page
2. Verify:
   - [ ] Products display
   - [ ] Images load correctly
   - [ ] Product details visible
   - [ ] All fields populated

### Test Inquiry Submission

1. Go to "Custom Label" page
2. Fill form with test data:
   - Name: Test User
   - Business: Test Business
   - Phone: +91-9999999999
   - City: Test City
   - Bottle Size: 500ml
   - Quantity: 1000
3. Submit form
4. Verify:
   - [ ] Success notification shows
   - [ ] Form clears
   - [ ] Data appears in Supabase

### Test Admin Panel

1. Navigate to `/admin/login`
2. Login with admin credentials
3. Verify:
   - [ ] Dashboard loads
   - [ ] Inquiries displayed
   - [ ] Can update inquiry status
   - [ ] Status change reflects in Supabase

### Test File Upload

1. On Custom Label page, select image
2. Verify:
   - [ ] Upload succeeds
   - [ ] Cloudinary URL received
   - [ ] Image displays

---

## Domain Configuration (Optional)

If you have a custom domain:

### For Vercel Frontend

1. In Vercel Project Settings → Domains
2. Add your domain
3. Update DNS records:
   - CNAME: `cname.vercel-dns.com`

### For Railway Backend

1. In Railway Project Settings
2. Add custom domain
3. Update DNS records per Railway instructions

---

## Monitoring & Maintenance

### Daily
- [ ] Check error logs
- [ ] Verify services are running
- [ ] Monitor database performance

### Weekly
- [ ] Review database size
- [ ] Check error patterns
- [ ] Verify backups

### Monthly
- [ ] Security updates
- [ ] Performance optimization
- [ ] Capacity planning

---

## Rollback Procedure

If critical issues found:

### Vercel Rollback
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find previous good deployment
4. Click "Promote to Production"

### Railway Rollback
1. Go to Railway Dashboard
2. Click "Deployments"
3. Select previous working deployment
4. Click "Redeploy"

---

## Production Troubleshooting

### Frontend Not Loading
- Check Vercel deployment logs
- Verify `VITE_API_URL` set correctly
- Clear browser cache

### Products Not Showing
- Check browser console for API errors
- Verify Railway URL is correct
- Check Supabase connection

### Inquiries Not Submitting
- Check network tab for failed requests
- Verify database credentials
- Check Railway server logs

### Email Not Sending
- Verify email configuration in Railway
- Check Gmail app password is correct
- Review email service logs

---

## Performance Tips

1. **Enable Caching**
   - Set cache headers for static assets
   - Use Vercel's built-in caching

2. **Optimize Images**
   - Use Cloudinary transformations
   - Implement lazy loading

3. **Database**
   - Monitor query performance
   - Use database indexes
   - Regular backups

4. **API**
   - Implement rate limiting (already done)
   - Use compression middleware
   - Monitor API response times

---

## Security Checklist

- [ ] All secrets in environment variables
- [ ] Never commit .env files
- [ ] HTTPS enforced (automatic)
- [ ] CORS configured for your domain
- [ ] JWT secret is strong
- [ ] Database backups enabled
- [ ] Rate limiting active
- [ ] Input validation enabled

---

## Success Indicators

✅ **Deployment is successful when:**

- Website loads at production URL
- All pages accessible
- Products display correctly
- Inquiry submission works
- Data persists in database
- Admin panel functional
- No critical errors
- Performance acceptable
- Email notifications sent
- Mobile responsive

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://railway.app/docs
- **Supabase Docs:** https://supabase.com/docs
- **Express Docs:** https://expressjs.com/

---

## Post-Launch Checklist

After going live:

- [ ] Monitor error logs daily
- [ ] Respond to inquiries promptly
- [ ] Test WhatsApp integration
- [ ] Update social media links
- [ ] Share website link
- [ ] Gather user feedback
- [ ] Plan marketing strategy
- [ ] Schedule regular backups

---

**Status:** ✅ Ready for Production Deployment

Start with backend deployment first, then frontend. Allow 30 minutes total for both deployments.
