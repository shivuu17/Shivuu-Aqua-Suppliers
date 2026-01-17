# Quick Start Guide

This guide will help you get the Shivuu Aqua Supplies website up and running in minutes.

## Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher) installed
- MongoDB installed locally OR a MongoDB Atlas account
- A Cloudinary account (free tier is fine)
- A Gmail account (for sending emails)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shivuu17/buisness.git
cd buisness
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set Up Environment Variables

```bash
# From the root directory
cd ..
cp .env.example .env
```

Now edit the `.env` file with your actual values:

#### Required Environment Variables:

**MongoDB:**
- For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/shivuu-aqua`
- For MongoDB Atlas: Get your connection string from MongoDB Atlas dashboard

**JWT Secret:**
- Generate a random secret: `JWT_SECRET=your_random_secret_key_here`

**Cloudinary (for logo uploads):**
1. Sign up at https://cloudinary.com
2. Get your credentials from the dashboard
3. Add to `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

**Email (Gmail):**
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password (Google Account → Security → App Passwords)
3. Add to `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_digit_app_password
   ```

**Business Information:**
Update these with your actual business details:
```
BUSINESS_PHONE=+919876543210
BUSINESS_WHATSAPP=919876543210
BUSINESS_EMAIL=contact@shivuuaqua.com
```

### 4. Initialize Database

```bash
cd server

# Create admin user (username: admin, password: admin123)
npm run create-admin

# Add sample products
npm run seed
```

**Important:** Change the admin password after first login!

### 5. Start the Application

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on http://localhost:5173

### 6. Access the Application

- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
  - Username: `admin`
  - Password: `admin123`

## Testing the Application

### Test Public Features:
1. Visit the home page
2. Navigate to Products page
3. Try the Custom Label designer (upload will work after Cloudinary setup)
4. Fill out an inquiry form
5. Check the About and Contact pages

### Test Admin Features:
1. Login at `/admin/login`
2. View the dashboard
3. Check inquiry statistics
4. Try changing inquiry status
5. Export inquiries to CSV

## Production Build

To create a production build of the frontend:

```bash
cd client
npm run build
```

The built files will be in `client/dist/` directory.

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Or check your MongoDB Atlas connection string

### Email Not Sending
- Verify Gmail App Password is correct
- Check if 2FA is enabled on your Gmail account
- Ensure no typos in EMAIL_USER and EMAIL_PASS

### Cloudinary Upload Failing
- Verify your Cloudinary credentials
- Check if your account is active
- Ensure API keys are correct

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `client/vite.config.js`

## Next Steps

1. **Customize Business Info:** Update phone numbers, email, and address in:
   - `.env` file
   - `client/src/utils/constants.js`

2. **Change Admin Password:** Login and create a new admin with a secure password

3. **Add Real Products:** Use the admin panel to add actual products with images

4. **Customize Design:** Modify colors in `client/tailwind.config.js`

5. **Add Your Logo:** Replace branding in Navbar and Footer components

6. **Deploy:** Follow deployment guides for Render (backend) and Vercel (frontend)

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Contact: contact@shivuuaqua.com

---

**Happy Building! 🚀**
