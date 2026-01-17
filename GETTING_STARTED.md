# 🚀 Getting Started - Shivuu Aqua Supplies

Welcome! This is your complete full-stack website for Shivuu Aqua Supplies. Everything is ready - you just need to configure and run it.

## ⚡ Quick Start (5 minutes)

### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

### 2. Configure Environment
```bash
# From root directory
cp .env.example .env
```

**Edit `.env` and set these REQUIRED variables:**
```env
MONGODB_URI=mongodb://localhost:27017/shivuu-aqua
JWT_SECRET=your_random_secret_here
```

**For full functionality, also set:**
- Cloudinary credentials (for logo uploads)
- Gmail credentials (for email notifications)
- Business phone and WhatsApp number

### 3. Initialize Database
```bash
cd server
npm run create-admin
npm run seed
```

### 4. Start the Application
```bash
# Terminal 1 - Backend (from server/)
npm run dev

# Terminal 2 - Frontend (from client/)
cd ../client
npm run dev
```

### 5. Access the Application
- **Website:** http://localhost:5173
- **Admin:** http://localhost:5173/admin/login
  - Username: `admin`
  - Password: `admin123`

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **README.md** | Complete project overview |
| **QUICKSTART.md** | Detailed setup guide |
| **DEPLOYMENT.md** | Production deployment |
| **API.md** | API documentation |
| **CHECKLIST.md** | Setup checklist |

---

## 🎯 What You Get

### Public Website
- ✅ Home page with hero, products, testimonials, FAQ
- ✅ Product catalog page
- ✅ Custom label designer with logo upload
- ✅ Quote/inquiry form
- ✅ About and Contact pages
- ✅ WhatsApp integration
- ✅ Mobile responsive design

### Admin Panel
- ✅ Secure login
- ✅ Dashboard with statistics
- ✅ Inquiry management
- ✅ Status tracking
- ✅ CSV export

---

## 🔧 Configuration

### Minimum Required (to run locally)
```env
MONGODB_URI=mongodb://localhost:27017/shivuu-aqua
JWT_SECRET=any_random_string
```

### For Full Features
1. **Cloudinary** (logo uploads)
   - Sign up: https://cloudinary.com
   - Add credentials to `.env`

2. **Gmail** (email notifications)
   - Enable 2FA
   - Create App Password
   - Add to `.env`

3. **Business Info**
   - Update phone numbers
   - Update email addresses
   - Update in `.env` and `client/src/utils/constants.js`

---

## ⚠️ Important Notes

1. **Change Admin Password!**
   - Default is `admin123`
   - Change after first login

2. **MongoDB Required**
   - Install locally OR use MongoDB Atlas
   - Set `MONGODB_URI` in `.env`

3. **Node.js Version**
   - Requires v16 or higher

---

## 🐛 Common Issues

**MongoDB Connection Error?**
- Start MongoDB: `mongod`
- Or use MongoDB Atlas connection string

**Port Already in Use?**
- Change `PORT` in `.env`

**Dependencies Not Installing?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

---

## 📞 Next Steps

1. ✅ Run the application locally
2. ✅ Test all features
3. ✅ Customize business information
4. ✅ Add real product data
5. ✅ Deploy to production (see DEPLOYMENT.md)

---

## 🎉 You're Ready!

The complete application is built and ready. Just configure and run!

**Need help?** Check the detailed guides in the documentation folder.

---

**Built for Shivuu Aqua Supplies**  
*Custom Branded Water Bottles - 250ml, 500ml, 1L*
