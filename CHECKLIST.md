# Project Setup Checklist

Use this checklist to ensure your Shivuu Aqua Supplies website is properly set up.

## ✅ Initial Setup

- [ ] Clone repository
- [ ] Install Node.js (v16 or higher)
- [ ] Install MongoDB locally OR create MongoDB Atlas account
- [ ] Create Cloudinary account
- [ ] Enable Gmail 2FA and create App Password

## ✅ Installation

- [ ] Run `cd server && npm install`
- [ ] Run `cd client && npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all environment variables in `.env`

## ✅ Environment Configuration

### Database
- [ ] Set `MONGODB_URI` (local or Atlas connection string)
- [ ] Test database connection

### JWT
- [ ] Generate and set `JWT_SECRET`

### Cloudinary
- [ ] Set `CLOUDINARY_CLOUD_NAME`
- [ ] Set `CLOUDINARY_API_KEY`
- [ ] Set `CLOUDINARY_API_SECRET`
- [ ] Test upload functionality

### Email
- [ ] Set `EMAIL_USER` (Gmail address)
- [ ] Set `EMAIL_PASS` (Gmail App Password)
- [ ] Set `ADMIN_EMAIL`
- [ ] Test email sending

### Business Information
- [ ] Update `BUSINESS_PHONE`
- [ ] Update `BUSINESS_WHATSAPP`
- [ ] Update `BUSINESS_EMAIL`
- [ ] Update business details in `client/src/utils/constants.js`

## ✅ Database Setup

- [ ] Run `npm run create-admin` from server directory
- [ ] Run `npm run seed` from server directory
- [ ] Verify products were created

## ✅ Development Testing

- [ ] Start backend server (`npm run dev` in server folder)
- [ ] Start frontend dev server (`npm run dev` in client folder)
- [ ] Access http://localhost:5173
- [ ] Test all public pages:
  - [ ] Home page loads correctly
  - [ ] Products page shows products
  - [ ] Custom Label page works
  - [ ] Inquiry form submits
  - [ ] About page displays
  - [ ] Contact page displays
- [ ] Test WhatsApp float button
- [ ] Test navigation menu (mobile and desktop)

## ✅ Admin Panel Testing

- [ ] Access http://localhost:5173/admin/login
- [ ] Login with default credentials (admin/admin123)
- [ ] View dashboard
- [ ] Check inquiry statistics
- [ ] Test status filter
- [ ] Update an inquiry status
- [ ] Export CSV
- [ ] **Change admin password!**

## ✅ Functionality Testing

### Inquiry Form
- [ ] Fill out inquiry form
- [ ] Submit successfully
- [ ] Check email notification received
- [ ] Verify inquiry appears in admin dashboard

### Custom Label Designer
- [ ] Upload logo
- [ ] Select bottle size
- [ ] Choose label style
- [ ] Preview displays correctly
- [ ] Continue to inquiry

### Logo Upload
- [ ] Upload image (< 5MB)
- [ ] Verify upload to Cloudinary
- [ ] Check logo URL is saved

## ✅ Responsive Design Testing

Test on different screen sizes:
- [ ] Mobile (< 640px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Mobile menu works correctly

## ✅ Production Build

- [ ] Run `npm run build` in client folder
- [ ] Build completes without errors
- [ ] No console errors or warnings

## ✅ Code Quality

- [ ] No console errors in browser
- [ ] No console warnings (important ones)
- [ ] All images load correctly
- [ ] All links work
- [ ] Forms validate properly

## ✅ Security

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Verify environment variables are not committed
- [ ] Check `.gitignore` includes sensitive files
- [ ] Test rate limiting on upload endpoint

## ✅ Customization

- [ ] Update business name in Navbar
- [ ] Update contact information
- [ ] Update WhatsApp number
- [ ] Replace placeholder content with real data
- [ ] Add real product images
- [ ] Update testimonials with real ones
- [ ] Update FAQ with actual questions

## ✅ Pre-Deployment

- [ ] Test all functionality one more time
- [ ] Verify all environment variables are documented
- [ ] Create MongoDB Atlas cluster (if using)
- [ ] Create Render account
- [ ] Create Vercel account
- [ ] Read DEPLOYMENT.md guide

## ✅ Deployment (when ready)

- [ ] Deploy database to MongoDB Atlas
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Test deployed application
- [ ] Run admin creation and seed scripts on production
- [ ] Configure custom domain (optional)

## ✅ Post-Deployment

- [ ] Test all features on production
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Create backups
- [ ] Document any production-specific configurations

## ✅ Marketing & Launch

- [ ] Add real product images and descriptions
- [ ] Create social media accounts
- [ ] Update contact information
- [ ] Add Google Analytics (if needed)
- [ ] Share website with initial customers
- [ ] Gather feedback and iterate

---

## Common Issues & Solutions

### MongoDB Connection Failed
- **Solution:** Check if MongoDB is running or verify Atlas connection string

### Email Not Sending
- **Solution:** Verify Gmail App Password and 2FA is enabled

### Images Not Uploading
- **Solution:** Check Cloudinary credentials and account status

### Build Fails
- **Solution:** Ensure all dependencies are installed and Node.js version is correct

### CORS Errors
- **Solution:** Verify CLIENT_URL in backend matches frontend URL

---

## Support Resources

- **Quick Start Guide:** QUICKSTART.md
- **Deployment Guide:** DEPLOYMENT.md
- **API Documentation:** API.md
- **Main README:** README.md

---

## Progress Tracking

**Setup Started:** ________________

**Development Complete:** ________________

**Testing Complete:** ________________

**Deployment Complete:** ________________

**Launch Date:** ________________

---

**Notes:**

_Use this space for any custom notes or configurations specific to your setup_

---

✨ **Good luck with your water bottle business!** ✨
