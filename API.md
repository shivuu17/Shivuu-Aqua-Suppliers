# API Documentation

Base URL: `http://localhost:5000/api` (development) or `https://your-domain.com/api` (production)

## Public Endpoints

### Health Check
```
GET /api/health
```
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

### Get All Products
```
GET /api/products
```
Retrieve all available bottle products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "size": "250ml",
      "priceRange": "₹8-12 per bottle",
      "MOQ": 500,
      "description": "Perfect for cafes...",
      "deliveryTime": "3-5 business days",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Create Inquiry
```
POST /api/inquiry
```
Submit a new inquiry/quote request.

**Request Body:**
```json
{
  "name": "John Doe",
  "businessName": "Cafe Coffee Corner",
  "phone": "9876543210",
  "city": "Mumbai",
  "bottleSize": "500ml",
  "quantity": "1000-2000 bottles/week",
  "address": "123 Main St, Mumbai",
  "message": "Need urgent delivery",
  "logoUrl": "https://cloudinary.com/...",
  "labelStyle": "Premium"
}
```

**Validation:**
- `name`: Required, string
- `businessName`: Required, string
- `phone`: Required, string (10 digits)
- `city`: Required, string
- `bottleSize`: Required, enum: ['250ml', '500ml', '1L']
- `quantity`: Required, string
- `address`: Optional, string
- `message`: Optional, string
- `logoUrl`: Optional, string
- `labelStyle`: Optional, enum: ['Classic', 'Premium', 'Traditional']

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "status": "New",
    ...
  }
}
```

---

### Upload Logo
```
POST /api/upload
```
Upload a logo image to Cloudinary.

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**
- `logo`: Image file (max 5MB)

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "shivuu-aqua/logos/..."
}
```

**Rate Limit:** 10 requests per 15 minutes

---

## Admin Endpoints

All admin endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Admin Login
```
POST /api/admin/login
```
Authenticate as an admin user.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@shivuuaqua.com"
  }
}
```

---

### Get All Inquiries
```
GET /api/inquiry
```
Retrieve all inquiries (admin only).

**Query Parameters:**
- `status`: Filter by status (optional) - 'New', 'Contacted', 'Converted'
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

---

### Update Inquiry Status
```
PATCH /api/inquiry/:id
```
Update the status of an inquiry.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "Contacted"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "status": "Contacted",
    ...
  }
}
```

---

### Export Inquiries to CSV
```
GET /api/inquiry/export/csv
```
Download all inquiries as a CSV file.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
CSV file download with headers:
```
Name,Business Name,Phone,City,Bottle Size,Quantity,Address,Status,Created At
```

---

### Add Product
```
POST /api/products
```
Add a new product (admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "size": "250ml",
  "priceRange": "₹8-12 per bottle",
  "MOQ": 500,
  "description": "Perfect for cafes",
  "imageUrl": "https://...",
  "deliveryTime": "3-5 days"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### Update Product
```
PUT /api/products/:id
```
Update an existing product.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
Same as Add Product

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### Delete Product
```
DELETE /api/products/:id
```
Delete a product.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200 OK`: Successful GET, PATCH, PUT, DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

## Rate Limiting

- **General API Routes:** 100 requests per 15 minutes per IP
- **Upload Endpoint:** 10 requests per 15 minutes per IP

When rate limit is exceeded:
```json
{
  "message": "Too many requests from this IP, please try again later"
}
```

---

## CORS Configuration

The API accepts requests from:
- Development: `http://localhost:5173`
- Production: Configured via `CLIENT_URL` environment variable

---

## Authentication

Admin endpoints use JWT (JSON Web Tokens) for authentication.

**Token Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiry:** 7 days

**How to Use:**
1. Login via `/api/admin/login`
2. Store the received token
3. Include token in Authorization header for protected routes
4. Token is validated on each request

---

## Database Models

### Inquiry
```javascript
{
  name: String,
  businessName: String,
  phone: String,
  city: String,
  bottleSize: String, // enum
  quantity: String,
  address: String,
  message: String,
  logoUrl: String,
  labelStyle: String, // enum
  status: String, // enum
  createdAt: Date
}
```

### Product
```javascript
{
  size: String, // enum
  priceRange: String,
  MOQ: Number,
  description: String,
  imageUrl: String,
  deliveryTime: String,
  createdAt: Date
}
```

### Admin
```javascript
{
  username: String,
  password: String, // hashed
  email: String,
  createdAt: Date
}
```

---

## Environment Variables Required

```
PORT=5000
MONGODB_URI=mongodb://...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASS=...
CLIENT_URL=http://localhost:5173
```

---

## Testing with cURL

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Product List
```bash
curl http://localhost:5000/api/products
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test Create Inquiry
```bash
curl -X POST http://localhost:5000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "businessName": "Test Cafe",
    "phone": "9876543210",
    "city": "Mumbai",
    "bottleSize": "500ml",
    "quantity": "500-1000 bottles/week"
  }'
```

---

For more information, see the main README.md file.
