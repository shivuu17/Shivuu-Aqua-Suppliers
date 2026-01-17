# Shivuu Aqua Supplies

Custom branded water bottle supplier for cafés, restaurants, hotels, clinics, events, and offices.

**Business Owner:** Shivank Katiyar  
**Location:** Usmanganj, Uttar Pradesh  
**Products:** Custom branded water bottles (250ml, 500ml, 1L) with waterproof labels

---

## 🚀 Project Overview

A modern, full-stack web application built with React, Node.js, Express, and MongoDB. The platform enables businesses to order custom branded water bottles with their logo, manage bulk orders, and track inquiries through an admin dashboard.

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form management
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for image storage
- **Nodemailer** for email notifications
- **Bcrypt** for password hashing
- **Express Validator** for input validation
- **Rate limiting** for API protection

## 📁 Project Structure

```
/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point
│   └── package.json
│
├── .env.example          # Environment variables template
├── .gitignore
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account (for image uploads)
- **Email service** (Gmail or other SMTP service)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivuu17/buisness.git
   cd buisness
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables:**

   Edit the `.env` file with your actual values:

   ```env
   # Server
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/shivuu-aqua
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shivuu-aqua

   # JWT
   JWT_SECRET=your_strong_secret_key_here

   # Cloudinary (Sign up at cloudinary.com)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email (For Gmail, use App Password)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Admin
   ADMIN_EMAIL=admin@shivuuaqua.com

   # Business
   BUSINESS_PHONE=+919876543210
   BUSINESS_WHATSAPP=919876543210
   BUSINESS_EMAIL=contact@shivuuaqua.com

   # Frontend URL
   CLIENT_URL=http://localhost:5173
   ```

### Database Setup

1. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

2. **Create an admin user:**

   You can create an admin user using MongoDB shell or create a script. Here's a simple Node.js script:

   ```javascript
   // Create file: server/scripts/createAdmin.js
   import mongoose from 'mongoose';
   import Admin from '../models/Admin.js';
   import dotenv from 'dotenv';

   dotenv.config();

   mongoose.connect(process.env.MONGODB_URI);

   const createAdmin = async () => {
     try {
       const admin = await Admin.create({
         username: 'admin',
         password: 'admin123', // Change this!
         email: 'admin@shivuuaqua.com'
       });
       console.log('Admin created:', admin.username);
       process.exit(0);
     } catch (error) {
       console.error('Error:', error);
       process.exit(1);
     }
   };

   createAdmin();
   ```

   Run it:
   ```bash
   cd server
   node scripts/createAdmin.js
   ```

### Running the Application

#### Development Mode

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Access the application:**
   - **Website:** http://localhost:5173
   - **Admin Login:** http://localhost:5173/admin/login
   - **API Health Check:** http://localhost:5000/api/health

#### Production Build

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server:**
   ```bash
   cd server
   npm start
   ```

## 📱 Features

### Public Features

1. **Home Page**
   - Hero section with CTAs
   - How it works section
   - Product showcase
   - Why choose us
   - Testimonials
   - FAQ section

2. **Products Page**
   - Display all bottle sizes (250ml, 500ml, 1L)
   - Product details (MOQ, delivery time, pricing)
   - Product features

3. **Custom Label Designer**
   - Upload business logo
   - Select bottle size
   - Choose label style
   - Preview mockup
   - Submit to inquiry

4. **Inquiry/Quote Form**
   - Business details collection
   - Bottle size and quantity selection
   - Address and notes
   - Email confirmation
   - WhatsApp integration

5. **About Page**
   - Company story
   - Founder information
   - Mission and values
   - Why choose us

6. **Contact Page**
   - Contact information
   - WhatsApp integration
   - Phone call button
   - Map placeholder
   - Business hours

### Admin Features

1. **Secure Login**
   - JWT-based authentication
   - Protected routes

2. **Dashboard**
   - View all inquiries
   - Statistics (total, new, contacted, converted)
   - Filter by status
   - Update inquiry status
   - Export to CSV

### Global Features

- **Sticky Navigation Bar**
- **Floating WhatsApp Button** (on all pages)
- **Responsive Design** (mobile-first)
- **Toast Notifications**
- **Loading States**
- **Error Handling**

## 🎨 Design System

### Colors
- **Primary:** Deep Blue (#0A2463, #1E3A8A)
- **Secondary:** Aqua/Cyan (#06B6D4, #22D3EE)
- **Accent:** White (#FFFFFF)
- **Text:** Dark Gray (#1F2937)

### Typography
- **Font Family:** Inter
- **Responsive sizing** with Tailwind classes

### Components
- Rounded cards with shadows
- Smooth hover transitions
- Modern button styles
- Loading skeletons
- Toast notifications

## 🔒 Security

- **JWT Authentication** for admin routes
- **Password hashing** with bcrypt
- **Input validation** with express-validator
- **Rate limiting** on API endpoints
- **CORS** configuration
- **File upload validation**

## 📧 Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 🌐 API Endpoints

### Public Routes
```
POST   /api/inquiry           - Create new inquiry
GET    /api/products          - Get all products
POST   /api/upload            - Upload logo to Cloudinary
```

### Admin Routes (Protected)
```
POST   /api/admin/login       - Admin authentication
GET    /api/inquiry           - Get all inquiries
PATCH  /api/inquiry/:id       - Update inquiry status
GET    /api/inquiry/export/csv - Export inquiries to CSV
POST   /api/products          - Add new product
PUT    /api/products/:id      - Update product
DELETE /api/products/:id      - Delete product
```

## 🚀 Deployment

### Backend (Render.com)

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables from `.env`

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory: `client`
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable: `VITE_API_URL` (your backend URL)

### Database (MongoDB Atlas)

1. Create a cluster on MongoDB Atlas
2. Create a database user
3. Whitelist IP addresses (or allow from anywhere for development)
4. Get connection string and update `MONGODB_URI`

## 🧪 Testing

The application should be tested for:
- Form validation
- API endpoints
- Authentication flow
- File uploads
- Email notifications
- WhatsApp integration
- Responsive design
- Browser compatibility

## 🤝 Contributing

This is a private business project. For any queries, contact the owner.

## 📄 License

MIT License - See LICENSE file for details

## 👤 Contact

**Shivank Katiyar**  
- Business: Shivuu Aqua Supplies  
- Location: Usmanganj, Uttar Pradesh  
- Phone: +919876543210  
- Email: contact@shivuuaqua.com

---

**Built with ❤️ for Shivuu Aqua Supplies**