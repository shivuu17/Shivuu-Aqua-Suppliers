# Data Flow Testing Guide

## System Overview

The complete data flow architecture consists of three layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React/Vite)                       │
│              http://localhost:5173                              │
│  - Navbar, Footer, ProductCard, Testimonials                   │
│  - Pages: Home, Products, About, Contact, CustomLabel, Inquiry │
│  - Admin: Login & Dashboard                                    │
└────────────────────────────┬──────────────────────────────────┘
                             │ HTTP/JSON
                    VITE_API_URL=http://localhost:5000/api
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                  BACKEND (Express.js)                          │
│              http://localhost:5000                             │
│  - Routes: /api/products, /api/inquiry, /api/upload           │
│  - Middleware: CORS, JWT Auth, Error Handler                  │
│  - Config: Rate limiting, Trust proxy                         │
└────────────────────────────┬──────────────────────────────────┘
                             │ Supabase
                    Client SDK (@supabase/supabase-js)
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                  DATABASE (Supabase)                           │
│    URL: https://dcavrnwyjrqomscmpfmn.supabase.co              │
│  - Table: products (id, size, price_range, moq, description)  │
│  - Table: inquiries (id, name, business_name, bottle_size)    │
│  - Table: admins (id, username, password, email)              │
└────────────────────────────────────────────────────────────────┘
```

## Configuration Files

### Backend (.env)
Located at: `/workspaces/buisness/backend/.env`

```env
PORT=5000
SUPABASE_URL=https://dcavrnwyjrqomscmpfmn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=5XGCoBJ35N2cOQTMzTwtLC7hig9kQPgHR7o6qJ+ZCz/R...
CLOUDINARY_CLOUD_NAME=ddz3vjfz3
CLOUDINARY_API_KEY=344872432896576
EMAIL_HOST=smtp.gmail.com
```

### Frontend (.env)
Located at: `/workspaces/buisness/frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Test Scenarios

### Test 1: Verify Backend Connection
**Endpoint:** `GET http://localhost:5000/`

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Shivuu Aqua Supplies Backend API",
  "endpoints": {
    "health": "/api/health",
    "products": "/api/products",
    "inquiry": "/api/inquiry",
    "upload": "/api/upload"
  }
}
```

**Test Command:**
```bash
curl http://localhost:5000/
```

### Test 2: Fetch Products from Database
**Endpoint:** `GET http://localhost:5000/api/products`

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "size": "250ml",
      "price_range": "₹8-12 per bottle",
      "moq": 1000,
      "description": "Perfect for cafes...",
      "image_url": "https://...",
      "delivery_time": "7-10 days",
      "created_at": "2024-01-20T10:00:00"
    },
    ...
  ]
}
```

**Test Flow:**
1. Ensure backend is running: `npm start` from `/workspaces/buisness/backend`
2. Run: `curl http://localhost:5000/api/products | json_pp`
3. Verify: Products array contains objects with expected fields

### Test 3: Frontend Product Display
**URL:** `http://localhost:5173`

**Expected Behavior:**
1. Page loads without errors
2. Navbar and Footer render
3. Home page displays
4. Products section shows images and details from API
5. All navigation links work

**Test Flow:**
1. Ensure backend is running
2. Start frontend: `npm run dev` from `/workspaces/buisness/frontend`
3. Open `http://localhost:5173` in browser
4. Check browser console (F12) for API errors
5. Navigate to Products page - should show fetched products
6. Inspect Network tab to see API requests

### Test 4: Submit Inquiry (Data → Database)
**Endpoint:** `POST http://localhost:5000/api/inquiry`

**Request Body:**
```json
{
  "name": "John Doe",
  "business_name": "My Restaurant",
  "phone": "+91-9876543210",
  "city": "Mumbai",
  "bottle_size": "500ml",
  "quantity": 5000,
  "address": "123 Main St, Mumbai",
  "message": "We need custom branding",
  "label_style": "premium"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Inquiry created successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "status": "pending",
    "created_at": "2024-01-20T10:00:00"
  }
}
```

**Test Flow:**
1. Frontend: Go to "Get Custom Label" page
2. Fill form with test data
3. Submit
4. Check for success toast notification
5. Backend: Query database to verify record created

### Test 5: Upload Logo (File → Cloudinary → Database)
**Endpoint:** `POST http://localhost:5000/api/upload`

**Request:** multipart/form-data with file

**Expected Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/..."
}
```

**Test Flow:**
1. Frontend: Go to "Custom Label" page
2. Select a logo image file
3. Upload
4. Should return Cloudinary URL
5. Logo URL should be stored in inquiry record

## Troubleshooting

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console (F12) for errors
2. Verify `VITE_API_URL` in `/workspaces/buisness/frontend/.env`
3. Ensure backend is running on port 5000
4. Check Network tab for failed API requests

### Issue: Products not loading
**Solution:**
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check if products exist in Supabase: Use Supabase dashboard
3. Check browser console for CORS errors
4. Run: `curl http://localhost:5000/api/products` to test directly

### Issue: Inquiry submission fails
**Solution:**
1. Check backend error response in browser console
2. Verify all required fields are filled
3. Check backend logs for validation errors
4. Verify Supabase connection: Check `.env` credentials

### Issue: File upload fails
**Solution:**
1. Verify Cloudinary credentials in backend `.env`
2. Check file size (should be < 5MB)
3. Verify file format (JPG, PNG, WebP supported)
4. Check backend logs for upload errors

## Quick Start Commands

### Terminal 1 - Backend
```bash
cd /workspaces/buisness/backend
npm install  # Only first time
npm start    # Start backend on port 5000
```

### Terminal 2 - Frontend
```bash
cd /workspaces/buisness/frontend
npm install  # Only first time
npm run dev  # Start frontend on port 5173
```

### Terminal 3 - Testing
```bash
# Test backend health
curl http://localhost:5000/api/health

# Fetch products
curl http://localhost:5000/api/products | json_pp

# Test CORS
curl -H "Origin: http://localhost:5173" http://localhost:5000/api/products

# Monitor backend logs
cd /workspaces/buisness/backend && npm start
```

## Database Verification

### Connect to Supabase

Use Supabase dashboard: https://app.supabase.com

1. Go to SQL Editor
2. Run queries to verify data:

```sql
-- Check products table
SELECT * FROM products;

-- Check inquiries table
SELECT * FROM inquiries;

-- Check record counts
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM inquiries;

-- View latest inquiry
SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 1;
```

## API Endpoints Reference

| Method | Endpoint | Purpose | Auth | Body |
|--------|----------|---------|------|------|
| GET | `/api/products` | Fetch all products | None | - |
| POST | `/api/inquiry` | Submit inquiry | None | name, phone, bottle_size, quantity |
| POST | `/api/upload` | Upload logo | None | file (multipart) |
| POST | `/api/admin/login` | Admin login | None | email, password |
| GET | `/api/admin/inquiries` | List inquiries | JWT | - |
| PATCH | `/api/admin/inquiries/:id` | Update inquiry | JWT | status |
| POST | `/api/admin/create` | Create admin | JWT | username, email, password |

## Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads without blank page
- [ ] `GET /api/products` returns product list
- [ ] Products display on home page
- [ ] Can navigate all pages
- [ ] Can submit inquiry from form
- [ ] Inquiry appears in Supabase dashboard
- [ ] Can upload logo file
- [ ] Logo URL stored in database
- [ ] Admin login works
- [ ] Admin dashboard displays inquiries
- [ ] Can update inquiry status from dashboard
- [ ] Emails send on inquiry submission

## Next Steps

Once all tests pass:

1. **Staging Deployment** - Deploy to Railway (backend) and Vercel (frontend)
2. **Production Deployment** - Set production URLs in .env
3. **Monitoring** - Set up logging and error tracking
4. **Backup** - Configure automated Supabase backups
5. **Performance** - Optimize images, implement caching
