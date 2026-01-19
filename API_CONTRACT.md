# API Specification & Contract

## Base URL
- **Development:** `http://localhost:5000`
- **Production:** `https://api.production-domain.com` (to be set during deployment)

## Authentication
- **Type:** JWT Bearer Token
- **Header:** `Authorization: Bearer <token>`
- **Token Storage:** localStorage key: `adminToken`

---

## Public Endpoints

### 1. Get All Products
```
GET /api/products
```

**Description:** Fetch all available water bottle products

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "size": "250ml",
      "price_range": "₹8-12 per bottle",
      "moq": 1000,
      "description": "Perfect for cafes and small restaurants",
      "image_url": "https://res.cloudinary.com/...",
      "delivery_time": "7-10 days",
      "created_at": "2024-01-20T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "size": "500ml",
      "price_range": "₹10-15 per bottle",
      "moq": 500,
      "description": "Most popular size for restaurants and hotels",
      "image_url": "https://res.cloudinary.com/...",
      "delivery_time": "7-10 days",
      "created_at": "2024-01-20T10:30:00Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

### 2. Create Inquiry
```
POST /api/inquiry
```

**Description:** Submit a new customer inquiry for custom branding

**Request Body:**
```json
{
  "name": "John Doe",
  "businessName": "My Restaurant",
  "phone": "+91-9876543210",
  "city": "Mumbai",
  "bottleSize": "500ml",
  "quantity": 5000,
  "address": "123 Main Street, Mumbai, MH 400001",
  "message": "Need custom branding for our restaurant",
  "logoUrl": "https://res.cloudinary.com/logo.png",
  "labelStyle": "premium"
}
```

**Field Validation:**
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| name | string | ✓ | Non-empty, trimmed |
| businessName | string | ✓ | Non-empty, trimmed |
| phone | string | ✓ | Non-empty, trimmed |
| city | string | ✓ | Non-empty, trimmed |
| bottleSize | string | ✓ | One of: `250ml`, `500ml`, `1L` |
| quantity | string | ✓ | Non-empty, trimmed |
| address | string | ✗ | - |
| message | string | ✗ | - |
| logoUrl | string | ✗ | Must be valid Cloudinary URL |
| labelStyle | string | ✗ | - |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "John Doe",
    "business_name": "My Restaurant",
    "phone": "+91-9876543210",
    "city": "Mumbai",
    "bottle_size": "500ml",
    "quantity": 5000,
    "address": "123 Main Street, Mumbai, MH 400001",
    "message": "Need custom branding for our restaurant",
    "logo_url": "https://res.cloudinary.com/logo.png",
    "label_style": "premium",
    "status": "New",
    "created_at": "2024-01-20T10:35:00Z"
  }
}
```

**Error Response (400 Validation Error):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

**Side Effects:**
- Sends email confirmation to customer
- Emails admin team about new inquiry
- Stores data in Supabase `inquiries` table

---

### 3. Upload File
```
POST /api/upload
```

**Description:** Upload logo or image file to Cloudinary

**Content-Type:** `multipart/form-data`

**Request:**
```
FormData:
  - logo: File (JPG, PNG, WebP, max 5MB)
```

**Response (200 OK):**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/ddz3vjfz3/image/upload/v1234567890/logo.png"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "File size exceeds maximum allowed size"
}
```

**Validation:**
- Max file size: 5MB
- Allowed formats: JPG, PNG, WebP
- Storage: Cloudinary (configured in backend .env)

---

### 4. Admin Login
```
POST /api/admin/login
```

**Description:** Authenticate admin user and receive JWT token

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure_password"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwIiwiaWF0IjoxNjc0MjA4NzUwLCJleHAiOjE2NzQyOTUxNTB9.signature",
  "admin": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

**Token Usage:**
- Returned token must be stored in localStorage as `adminToken`
- Include in subsequent requests: `Authorization: Bearer <token>`
- Token expiry: 24 hours

---

## Protected Endpoints (Requires JWT Token)

### 5. Get All Inquiries
```
GET /api/admin/inquiries
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "John Doe",
      "business_name": "My Restaurant",
      "phone": "+91-9876543210",
      "city": "Mumbai",
      "bottle_size": "500ml",
      "quantity": 5000,
      "status": "New",
      "created_at": "2024-01-20T10:35:00Z"
    }
  ]
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

---

### 6. Update Inquiry Status
```
PATCH /api/admin/inquiries/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
- `id`: Inquiry UUID

**Request Body:**
```json
{
  "status": "Quoted"
}
```

**Valid Status Values:**
- `New` - Initial submission
- `Quoted` - Quote sent to customer
- `In Progress` - Order in production
- `Completed` - Order delivered
- `Cancelled` - Order cancelled

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Inquiry updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "status": "Quoted",
    "updated_at": "2024-01-20T11:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Inquiry not found"
}
```

---

### 7. Create Admin
```
POST /api/admin/create
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "secure_password"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "username": "newadmin",
    "email": "newadmin@example.com"
  }
}
```

---

### 8. Health Check
```
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "Server is running with Supabase"
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error description",
  "details": "Additional error information (in development only)"
}
```

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Unexpected error |

---

## Rate Limiting

**Applied to:** All `/api/*` routes

**Limits:**
- 100 requests per 15 minutes per IP
- Exceeded limit returns 429 Too Many Requests

---

## CORS Configuration

**Allowed Origins:** All (`*`)

**Allowed Methods:** GET, POST, PUT, PATCH, DELETE, OPTIONS

**Allowed Headers:** Content-Type, Authorization

---

## Request/Response Format

**Content-Type:** `application/json`

All requests and responses use JSON format unless otherwise specified.

---

## Frontend Usage Examples

### Fetch Products
```javascript
import { apiService } from './services/api.js';

const products = await apiService.getProducts();
```

### Submit Inquiry
```javascript
const response = await apiService.submitInquiry({
  name: 'John Doe',
  businessName: 'My Restaurant',
  phone: '+91-9876543210',
  city: 'Mumbai',
  bottleSize: '500ml',
  quantity: 5000,
  address: '123 Main St',
  message: 'Custom branding needed',
  labelStyle: 'premium'
});
```

### Upload Logo
```javascript
const response = await apiService.uploadLogo(fileInput.files[0]);
const logoUrl = response.url;
```

### Admin Login
```javascript
const response = await apiService.adminLogin('admin@example.com', 'password');
localStorage.setItem('adminToken', response.token);
```

---

## Database Schema

### products table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  size VARCHAR(50) NOT NULL,
  price_range VARCHAR(100) NOT NULL,
  moq INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  delivery_time VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (size)
);
```

### inquiries table
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  bottle_size VARCHAR(50) NOT NULL,
  quantity VARCHAR(50) NOT NULL,
  address TEXT,
  message TEXT,
  logo_url TEXT,
  label_style VARCHAR(100),
  status VARCHAR(50) DEFAULT 'New',
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (status),
  INDEX (created_at)
);
```

### admins table
```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (username)
);
```

---

## Deployment URLs (To Be Updated)

| Environment | Frontend | Backend | Database |
|-------------|----------|---------|----------|
| Development | http://localhost:5173 | http://localhost:5000 | Supabase |
| Staging | `<vercel-url>` | Railway (TBD) | Supabase |
| Production | `<production-url>` | Railway (TBD) | Supabase |

---

**Last Updated:** 2024-01-20
**Status:** Ready for Integration Testing
