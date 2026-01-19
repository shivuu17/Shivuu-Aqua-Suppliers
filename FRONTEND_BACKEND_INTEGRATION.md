# Frontend-Backend API Integration Guide

## Quick Reference

### Backend API Endpoints

#### 1. GET /api/products
Fetches all available bottle products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "size": "250ml",
      "price_range": "₹8-12 per bottle",
      "moq": 1000,
      "description": "Perfect for cafes and small restaurants...",
      "image_url": "https://cloudinary.com/...",
      "delivery_time": "7-10 days"
    }
  ]
}
```

**Frontend Usage:**
```jsx
// In Products.jsx
const response = await api.get('/products');
const products = response.data.data; // Array of products

// Access properties
product.price_range    // not priceRange
product.image_url      // not imageUrl
product.delivery_time  // not deliveryTime
```

#### 2. POST /api/inquiry
Submit a customer inquiry for custom bottles.

**Request Fields (Frontend):**
```json
{
  "name": "John Doe",
  "businessName": "ABC Corporation",
  "phone": "+919876543210",
  "city": "Delhi",
  "bottleSize": "500ml",
  "quantity": "5000",
  "address": "123 Main St, Delhi",
  "message": "Need samples first",
  "logoUrl": "https://example.com/logo.png",
  "labelStyle": "Premium"
}
```

**Backend Converts To (Supabase):**
```json
{
  "name": "John Doe",
  "business_name": "ABC Corporation",
  "phone": "+919876543210",
  "city": "Delhi",
  "bottle_size": "500ml",
  "quantity": "5000",
  "address": "123 Main St, Delhi",
  "message": "Need samples first",
  "logo_url": "https://example.com/logo.png",
  "label_style": "Premium",
  "status": "New"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": { /* inquiry object */ }
}
```

**Frontend Usage:**
```jsx
// In Inquiry.jsx
const response = await api.post('/inquiry', {
  name: formData.name,
  businessName: formData.businessName,  // camelCase!
  phone: formData.phone,
  // ... other fields
});
```

#### 3. POST /api/upload
Upload a logo image file.

**Request:**
```
Content-Type: multipart/form-data
file: <binary image data>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cloudinary.com/uploaded/image.jpg",
    "publicId": "public_id_12345"
  }
}
```

**Frontend Usage:**
```jsx
// In CustomLabel.jsx
const formData = new FormData();
formData.append('file', blob);

const response = await api.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const logoUrl = response.data.data.url;
```

#### 4. GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

---

## Field Name Mapping

### Products
| Backend (Supabase) | Frontend (UI Form) | Frontend (Code) |
|-------|--------|---------|
| `price_range` | Price Range | `product.price_range` |
| `image_url` | (image preview) | `product.image_url` |
| `delivery_time` | Delivery Time | `product.delivery_time` |
| `moq` | MOQ | `product.moq` |

### Inquiries
| Frontend Form | Frontend Code | Backend (API sends) | Backend (Supabase) |
|--------|---------|---------|---------|
| Name | `formData.name` | `name` | `name` |
| Business Name | `formData.businessName` | `businessName` | `business_name` |
| Phone | `formData.phone` | `phone` | `phone` |
| City | `formData.city` | `city` | `city` |
| Bottle Size | `formData.bottleSize` | `bottleSize` | `bottle_size` |
| Quantity | `formData.quantity` | `quantity` | `quantity` |
| Address | `formData.address` | `address` | `address` |
| Message | `formData.message` | `message` | `message` |
| Logo URL | `formData.logoUrl` | `logoUrl` | `logo_url` |
| Label Style | `formData.labelStyle` | `labelStyle` | `label_style` |

---

## Important Notes

### camelCase vs snake_case
- **Frontend forms and code:** Use `camelCase` (e.g., `businessName`, `bottleSize`)
- **Backend Supabase columns:** Use `snake_case` (e.g., `business_name`, `bottle_size`)
- **Backend automatically converts** camelCase from frontend to snake_case for database

### Bottle Size Options
Always validate against these exact values:
- `"250ml"`
- `"500ml"`
- `"1L"`

### Label Style Options
Always validate against these exact values:
- `"Classic"`
- `"Premium"`
- `"Traditional"`

### Image Upload
- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: 5MB
- Images uploaded to Cloudinary (handled by backend)
- Returns public URL for use in inquiries

### Required vs Optional Fields

**Inquiry Required Fields:**
- `name`
- `businessName`
- `phone`
- `city`
- `bottleSize`
- `quantity`

**Inquiry Optional Fields:**
- `address`
- `message`
- `logoUrl`
- `labelStyle`

---

## Common Issues & Solutions

### Issue: 400 Bad Request on Inquiry Submit
**Cause:** Missing required field or incorrect field name
**Solution:** 
- Check that all required fields are provided
- Use exact field names (camelCase)
- Validate enum values (bottleSize, labelStyle)

### Issue: Upload returns 415 Unsupported Media Type
**Cause:** Wrong Content-Type header or unsupported file format
**Solution:**
- Let axios auto-set Content-Type for FormData
- Ensure file is valid image format
- Check file size is under 5MB

### Issue: Product data shows undefined
**Cause:** Accessing with wrong field names
**Solution:**
- Use `product.price_range` not `product.priceRange`
- Use `product.image_url` not `product.imageUrl`
- Use `product.delivery_time` not `product.deliveryTime`

---

## API Service Configuration

**File:** `/workspaces/buisness/frontend/src/services/api.js`

```javascript
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Automatically adds token to authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Usage:**
```javascript
import api from '../services/api';

// GET request
const response = await api.get('/products');

// POST request with data
const response = await api.post('/inquiry', { /* data */ });

// POST request with file upload
const formData = new FormData();
formData.append('file', file);
const response = await api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

## Environment Configuration

**File:** `.env` or `.env.local` in frontend root

```env
VITE_API_URL=http://localhost:5000/api
# or for production
VITE_API_URL=https://api.shivuuaqua.com/api
```

If not set, defaults to `/api` (relative path)

---

## Testing the Integration

### 1. Test Products Page
```bash
# Should see loading state, then products from /api/products
# Try filtering by size
# Verify field names are correct
```

### 2. Test Inquiry Form
```bash
# Try submitting with missing fields (should validate)
# Try submitting with all fields
# Check response notification
# Try different bottle sizes and label styles
```

### 3. Test Custom Label Upload
```bash
# Try uploading valid image (should work)
# Try uploading oversized file (should error)
# Try uploading unsupported format (should error)
# Copy URL and verify it works
```

---

## Debugging Tips

1. **Network Tab:** Check actual request/response in browser DevTools
2. **Console Errors:** Look for API response errors in console
3. **Backend Logs:** Check backend terminal for error messages
4. **Database:** Verify data is actually in Supabase
5. **API Health:** Test `/api/health` endpoint first

