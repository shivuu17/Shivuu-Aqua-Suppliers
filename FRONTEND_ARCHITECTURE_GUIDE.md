# Frontend-Backend Integration Overview

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Navbar / Layout                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Products      │  │  Inquiry Form    │  │ CustomLabel  │  │
│  │  Page          │  │  Page            │  │ Upload Page  │  │
│  ├─────────────────┤  ├──────────────────┤  ├──────────────┤  │
│  │ • API Fetch    │  │ • Form Handler   │  │ • File Input │  │
│  │ • Filter/Sort  │  │ • Validation     │  │ • Preview    │  │
│  │ • Loading      │  │ • Submit API     │  │ • Upload API │  │
│  │ • Error State  │  │ • Success/Error  │  │ • URL Output │  │
│  └─────────────────┘  └──────────────────┘  └──────────────┘  │
│         │                    │                     │           │
│         └────────────────────┴─────────────────────┘           │
│                          │                                     │
│              ┌───────────▼──────────────┐                      │
│              │   api.js (axios)         │                      │
│              │  (Base URL + Headers)    │                      │
│              └───────────┬──────────────┘                      │
│                          │                                     │
└──────────────────────────┼─────────────────────────────────────┘
                           │
                    ╔══════▼════════╗
                    ║  BACKEND API  ║
                    ║  (Express.js) ║
                    ╚══════╤════════╝
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
   ┌──▼────┐        ┌──────▼──────┐     ┌──────▼──────┐
   │GET    │        │POST         │     │POST        │
   │/prod  │        │/inquiry     │     │/upload     │
   │ucts   │        │             │     │            │
   └──┬────┘        └──────┬──────┘     └──────┬──────┘
      │                    │                    │
      └────────────────────┼────────────────────┘
                           │
                    ┌──────▼──────────┐
                    │  Supabase DB    │
                    │  + Cloudinary   │
                    └─────────────────┘
```

---

## Data Flow Examples

### 1. Products Page Flow

```
USER VISITS /products
         │
         ▼
useEffect Hook Triggers
         │
         ▼
setLoading(true)
Show Spinner
         │
         ▼
api.get('/products')
         │
         ▼
Backend Query: SELECT * FROM products
         │
         ▼
Response: {
  success: true,
  data: [
    {
      id: 1,
      size: "250ml",
      price_range: "₹8-12",        ◄── snake_case
      moq: 1000,
      description: "...",
      image_url: "https://...",    ◄── snake_case
      delivery_time: "7-10 days"   ◄── snake_case
    }
  ]
}
         │
         ▼
setProducts(data)
setLoading(false)
         │
         ▼
Render Products Grid
Display each product with:
  - product.price_range           ◄── Access with snake_case
  - product.image_url             ◄── Access with snake_case
  - product.delivery_time         ◄── Access with snake_case
```

### 2. Inquiry Form Flow

```
USER FILLS FORM
    │
    ├─ name: "John"
    ├─ businessName: "ABC Corp"        ◄── camelCase in frontend
    ├─ phone: "+919876543210"
    ├─ city: "Delhi"
    ├─ bottleSize: "500ml"             ◄── camelCase in frontend
    ├─ quantity: "5000"
    ├─ logoUrl: "https://..."          ◄── camelCase in frontend
    └─ labelStyle: "Premium"           ◄── camelCase in frontend
             │
             ▼
   Validate (client-side)
    All required fields present?
             │
             ▼
   POST /api/inquiry
   {
     name: "John",
     businessName: "ABC Corp",          ◄── Sent as camelCase
     phone: "+919876543210",
     city: "Delhi",
     bottleSize: "500ml",               ◄── Sent as camelCase
     quantity: "5000",
     logoUrl: "https://...",            ◄── Sent as camelCase
     labelStyle: "Premium"              ◄── Sent as camelCase
   }
             │
             ▼
   Backend Validation
   Express-validator checks
             │
             ▼
   Backend Converts Names
   businessName → business_name         ◄── Converted to snake_case
   bottleSize → bottle_size             ◄── Converted to snake_case
   logoUrl → logo_url                   ◄── Converted to snake_case
   labelStyle → label_style             ◄── Converted to snake_case
   Add status: "New"
             │
             ▼
   INSERT into Supabase (inquiries table)
   {
     name: "John",
     business_name: "ABC Corp",         ◄── Stored as snake_case
     phone: "+919876543210",
     city: "Delhi",
     bottle_size: "500ml",              ◄── Stored as snake_case
     quantity: "5000",
     logo_url: "https://...",           ◄── Stored as snake_case
     label_style: "Premium",            ◄── Stored as snake_case
     status: "New"
   }
             │
             ▼
   Response: {
     success: true,
     message: "Inquiry submitted successfully",
     data: { /* full inquiry object */ }
   }
             │
             ▼
   Frontend Shows Success
   Clear Form
   Reset State
```

### 3. Logo Upload Flow

```
USER SELECTS FILE
       │
       ▼
Validate File
  ├─ Type: JPEG, PNG, GIF, WebP? ✓
  └─ Size: < 5MB? ✓
       │
       ▼
Show Preview (Base64)
       │
       ▼
USER CLICKS UPLOAD
       │
       ▼
Convert to Blob
Create FormData
       │
       ▼
POST /api/upload
Content-Type: multipart/form-data
       │
       ▼
Backend (Multer)
Parse FormData
       │
       ▼
Upload to Cloudinary
       │
       ▼
Response: {
  success: true,
  data: {
    url: "https://res.cloudinary.com/...",
    publicId: "folder/image_12345"
  }
}
       │
       ▼
Frontend Display URL
Show "Copy" Button
       │
       ▼
USER COPIES URL
       │
       ▼
Use in Inquiry Form
logoUrl: "https://res.cloudinary.com/..."
```

---

## API Endpoint Reference

### GET /api/products
**Request:**
```
GET http://localhost:5000/api/products
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "size": "250ml",
      "price_range": "₹8-12 per bottle",
      "moq": 1000,
      "description": "Perfect for cafes and small restaurants.",
      "image_url": "https://cloudinary.com/...",
      "delivery_time": "7-10 days"
    },
    { /* more products */ }
  ]
}
```

---

### POST /api/inquiry
**Request:**
```
POST http://localhost:5000/api/inquiry
Content-Type: application/json

{
  "name": "John Doe",
  "businessName": "ABC Corporation",
  "phone": "+919876543210",
  "city": "Delhi",
  "bottleSize": "500ml",
  "quantity": "5000",
  "address": "123 Main St, Delhi",
  "message": "Need high quality bottles",
  "logoUrl": "https://res.cloudinary.com/...",
  "labelStyle": "Premium"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": {
    "id": 42,
    "name": "John Doe",
    "business_name": "ABC Corporation",
    "phone": "+919876543210",
    "city": "Delhi",
    "bottle_size": "500ml",
    "quantity": "5000",
    "address": "123 Main St, Delhi",
    "message": "Need high quality bottles",
    "logo_url": "https://res.cloudinary.com/...",
    "label_style": "Premium",
    "status": "New",
    "created_at": "2026-01-19T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "msg": "Name is required",
      "param": "name"
    },
    {
      "msg": "Invalid bottle size",
      "param": "bottleSize"
    }
  ]
}
```

---

### POST /api/upload
**Request:**
```
POST http://localhost:5000/api/upload
Content-Type: multipart/form-data

FormData:
  file: <binary image data>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/abcdef.jpg",
    "publicId": "bottles/logo_12345"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "File too large. Maximum size is 5MB"
}
```

---

## Component State Management

### Products.jsx
```javascript
const [selectedSize, setSelectedSize] = useState(null);
const [products, setProducts] = useState([]);           // API data
const [loading, setLoading] = useState(true);           // Loading state
const [error, setError] = useState(null);               // Error message

// Lifecycle: useEffect → fetchProducts → setProducts → render
```

### Inquiry.jsx
```javascript
const [formData, setFormData] = useState({
  name: '',
  businessName: '',
  phone: '',
  city: '',
  bottleSize: '500ml',
  quantity: '',
  address: '',
  message: '',
  logoUrl: '',
  labelStyle: 'Classic',
});

const [loading, setLoading] = useState(false);          // Submit loading
const [error, setError] = useState(null);               // Error message
const [success, setSuccess] = useState(false);          // Success flag
const [errors, setErrors] = useState({});               // Field errors

// Flow: User Input → Validation → handleSubmit → API → Success/Error
```

### CustomLabel.jsx
```javascript
const [logoPreview, setLogoPreview] = useState(null);   // Preview URL
const [uploading, setUploading] = useState(false);      // Upload loading
const [error, setError] = useState(null);               // Error message
const [success, setSuccess] = useState(null);           // Success message
const [uploadedUrl, setUploadedUrl] = useState(null);   // Uploaded URL

// Flow: File Select → Validate → Preview → Upload → URL Display
```

---

## Validation Rules

### Product Fields
| Field | Type | Source | Validation |
|-------|------|--------|-----------|
| id | number | DB | Auto-generated |
| size | string | DB | Enum: 250ml, 500ml, 1L |
| price_range | string | DB | Format: "₹X-Y per bottle" |
| moq | number | DB | Positive integer |
| description | string | DB | Any text |
| image_url | string | DB | Valid URL or null |
| delivery_time | string | DB | Format: "X-Y days" |

### Inquiry Fields
| Field | Type | Required | Backend Validation |
|-------|------|----------|-------------------|
| name | string | Yes | Must not be empty |
| businessName | string | Yes | Must not be empty |
| phone | string | Yes | Must not be empty |
| city | string | Yes | Must not be empty |
| bottleSize | string | Yes | Must be in [250ml, 500ml, 1L] |
| quantity | string | Yes | Must not be empty |
| address | string | No | Any text or empty |
| message | string | No | Any text or empty |
| logoUrl | string | No | Valid URL or empty |
| labelStyle | string | No | Any text or empty |
| status | string | No | Auto-set to "New" |

### Upload Fields
| Aspect | Requirement |
|--------|------------|
| Format | JPEG, PNG, GIF, WebP |
| Size | Max 5MB |
| Encoding | Base64 for preview, FormData for upload |
| Response | URL + publicId from Cloudinary |

---

## Error Handling Strategy

### Frontend Error Handling
```javascript
try {
  // Make API call
  const response = await api.get('/products');
  
  // Success
  if (response.data.success) {
    setData(response.data.data);
  }
} catch (error) {
  // Network error or server error
  if (error.response?.status === 400) {
    // Validation error
    setErrors(error.response.data.errors);
  } else if (error.response?.status === 401) {
    // Unauthorized
    redirectToLogin();
  } else {
    // Generic error
    setError('Failed to load data. Please try again.');
  }
}
```

### Backend Error Response
```javascript
// Validation Error (400)
{
  "errors": [{ "msg": "...", "param": "field" }]
}

// Server Error (500)
{
  "message": "Internal server error"
}

// Unauthorized (401)
{
  "message": "Not authenticated"
}
```

---

## Performance Considerations

1. **Products Loading:**
   - Single API call on mount
   - Cached in state (no re-fetching on filter)
   - Filtering happens client-side

2. **Image Loading:**
   - Images from Cloudinary (CDN)
   - Lazy loading recommended for future

3. **Form Submission:**
   - Validation before API call
   - Loading state prevents duplicate submissions
   - Auto-dismiss success after 5 seconds

4. **File Upload:**
   - File size checked before upload
   - Base64 preview only (not uploaded)
   - Cloudinary handles optimization

---

## Browser Compatibility

- Modern browsers (ES6+)
- axios (HTTP client)
- React Hooks (functional components)
- FormData API (file uploads)
- LocalStorage (token storage)

---

## Security Considerations

1. **Input Validation:**
   - Frontend validation for UX
   - Backend validation for security (express-validator)
   - Type checking and enum validation

2. **File Upload:**
   - File type validation
   - File size limits
   - Cloudinary handles malicious content

3. **Token Management:**
   - Stored in localStorage
   - Sent in Authorization header
   - Interceptor adds automatically

4. **CORS:**
   - withCredentials enabled
   - Backend must configure CORS properly

---

## Deployment Checklist

- [ ] Set VITE_API_URL environment variable
- [ ] Backend API endpoint is accessible
- [ ] Database migrations complete
- [ ] Cloudinary credentials configured
- [ ] Email service configured
- [ ] CORS properly configured on backend
- [ ] Build production bundle: `npm run build`
- [ ] Test all flows in production
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

