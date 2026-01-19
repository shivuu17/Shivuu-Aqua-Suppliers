# Quick Start - Testing Frontend API Integration

## Prerequisites

1. Backend server running on http://localhost:5000
2. Frontend dev server running on http://localhost:5173 (or similar)
3. Supabase database populated with products
4. Cloudinary configured for uploads

---

## Step 1: Start Backend

```bash
cd /workspaces/buisness/backend

# Install dependencies (if not done)
npm install

# Run development server
npm run dev

# Expected output:
# Server running on http://localhost:5000
```

---

## Step 2: Start Frontend

```bash
cd /workspaces/buisness/frontend

# Install dependencies (if not done)
npm install

# Set API URL (if needed)
export VITE_API_URL=http://localhost:5000/api
# or in .env file:
# VITE_API_URL=http://localhost:5000/api

# Run development server
npm run dev

# Expected output:
# VITE v4.x.x build xxx
# ➜  Local: http://localhost:5173/
```

---

## Step 3: Test Products Page

### URL: http://localhost:5173/products

### Expected Behavior:
1. **Loading State:**
   - Should show spinner for 1-2 seconds
   - "Loading products..." message

2. **Success State:**
   - Products appear in 3-column grid
   - Filter buttons for All, 250ml, 500ml, 1L

3. **Product Card Content:**
   - Size heading (e.g., "250ml")
   - Description text
   - Price range (e.g., "₹8-12 per bottle")
   - MOQ (e.g., "1000 units")
   - Delivery time (e.g., "7-10 days")
   - Image or emoji
   - "Chat on WhatsApp" button

### Verify Field Names:
```javascript
// Open Browser DevTools Console
// Go to Network tab
// Filter for "products"
// Click on the request
// Check Response tab

// Should see:
{
  "success": true,
  "data": [
    {
      "size": "250ml",
      "price_range": "₹8-12 per bottle",    // ← snake_case
      "moq": 1000,
      "description": "...",
      "image_url": "https://...",           // ← snake_case
      "delivery_time": "7-10 days"          // ← snake_case
    }
  ]
}
```

### Test Filtering:
```javascript
1. Click "All Sizes" button - all products show
2. Click "250ml" button - only 250ml products
3. Click "500ml" button - only 500ml products
4. Click "1L" button - only 1L products
5. Click "All Sizes" again - all products back
```

### Test Error Handling:
```javascript
1. Stop the backend server
2. Refresh the page
3. Should see error message with "Try Again" button
4. Start backend again
5. Click "Try Again" button
6. Products should load
```

---

## Step 4: Test Inquiry Form

### URL: http://localhost:5173/inquiry

### Test Required Field Validation:
```javascript
1. Leave all fields empty
2. Click "Submit Inquiry"
3. Should see errors under each required field:
   - Name is required
   - Business name is required
   - Phone is required
   - City is required
   - Bottle size is required
   - Quantity is required
```

### Test Form Submission:
```javascript
1. Fill form:
   - Name: "Test User"
   - Business Name: "Test Business"
   - Phone: "+919876543210"
   - City: "Delhi"
   - Bottle Size: "500ml"
   - Quantity: "1000"
   - Address: "123 Test St"
   - Message: "Test message"
   - Logo URL: (leave empty)
   - Label Style: "Classic"

2. Click "Submit Inquiry"

3. Should see:
   - Loading spinner
   - "Submitting..." text
   - Button disabled during submission

4. After success:
   - Green success notification
   - Form clears
   - Notification disappears after 5 seconds
```

### Verify in Backend:
```bash
# Check backend logs for inquiry received
# Or query Supabase directly:
# SELECT * FROM inquiries WHERE status = 'New' ORDER BY created_at DESC LIMIT 1;
```

### Verify Field Names:
```javascript
// Open Browser DevTools Console
// Go to Network tab
// Filter for "inquiry"
// Click on POST request
// Check Request tab → Payload

// Should send (camelCase):
{
  "name": "Test User",
  "businessName": "Test Business",      // ← camelCase
  "phone": "+919876543210",
  "city": "Delhi",
  "bottleSize": "500ml",                // ← camelCase
  "quantity": "1000",
  "address": "123 Test St",
  "message": "Test message",
  "logoUrl": "",                        // ← camelCase
  "labelStyle": "Classic"               // ← camelCase
}

// Backend should convert to (snake_case) before saving
```

### Test Optional Fields:
```javascript
1. Submit with only required fields (no address, message, etc.)
2. Should still work
3. Optional fields should be empty in database
```

### Test Enum Values:
```javascript
1. Bottle Size dropdown - should have: 250ml, 500ml, 1L
2. Label Style dropdown - should have: Classic, Premium, Traditional
3. Try each option
4. Submit should work with any selection
```

### Test Error Handling:
```javascript
1. Stop backend server
2. Fill form and submit
3. Should see error message: "Failed to submit inquiry..."
4. Start backend again
5. Form still filled
6. Retry submission - should work
```

---

## Step 5: Test Custom Label Upload

### URL: http://localhost:5173/custom-label

### Test Valid File Upload:
```javascript
1. Prepare a test image (JPG, PNG, GIF, or WebP)
2. File size: < 5MB
3. Click on the upload area
4. Select your image file
5. Should see preview of image

6. Click "Upload Logo" button
7. Should see:
   - Loading spinner
   - "Uploading..." text
   - Button disabled

8. After success:
   - Green success notification
   - URL appears in text box
   - "Copy" button available
```

### Verify Uploaded URL:
```javascript
// Open Browser DevTools Console
// Go to Network tab
// Filter for "upload"
// Click on POST request
// Check Response tab

// Should see:
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "bottles/xyz123"
  }
}
```

### Test Copy to Clipboard:
```javascript
1. After upload, click "Copy" button
2. You should see: "URL copied to clipboard!"
3. Paste somewhere to verify URL is valid
4. Try opening URL in browser - image should display
```

### Test File Validation:
```javascript
// Test oversized file
1. Create image > 5MB
2. Select it
3. Should see error: "File size must be less than 5MB"

// Test invalid format
1. Create text file (or any non-image)
2. Select it
3. Should see error: "Please upload an image file (JPG, PNG, GIF, or WebP)"
```

### Test Clear Button:
```javascript
1. Upload a file
2. Click "Clear" button
3. Preview should disappear
4. Upload area resets
5. Can select new file
```

### Test Error Handling:
```javascript
1. Stop backend server
2. Select a file and click upload
3. Should see error message: "Failed to upload logo..."
4. Start backend
5. Retry - should work
```

---

## Step 6: Test Integration Flow

### Complete User Journey:

```javascript
// SCENARIO: User wants to order custom bottles

// 1. User visits /products
//    - Sees available bottle sizes
//    - Clicks on specific size
//    - Filters products (client-side)

// 2. User wants to customize
//    - Goes to /custom-label
//    - Uploads company logo
//    - Copies the URL

// 3. User submits inquiry
//    - Goes to /inquiry
//    - Fills form details
//    - Pastes logo URL in "Logo URL" field
//    - Selects label style (Premium)
//    - Submits form

// 4. Backend receives inquiry
//    - Validates all fields
//    - Stores in Supabase
//    - Sends confirmation email
//    - Admin sees new inquiry in dashboard

// 5. User gets confirmation
//    - Success message on form
//    - Email confirmation sent
//    - Can track inquiry status
```

---

## Browser Developer Tools Verification

### Check Network Calls:

```javascript
// 1. Products API Call
GET /api/products
Response: {success: true, data: [...]}
Status: 200

// 2. Inquiry API Call
POST /api/inquiry
Payload: {name, businessName, phone, ...}
Response: {success: true, message: "...", data: {...}}
Status: 201

// 3. Upload API Call
POST /api/upload
Headers: Content-Type: multipart/form-data
Response: {success: true, data: {url, publicId}}
Status: 200
```

### Check Console for Errors:

```javascript
// Should be NO errors about:
// - 404 Not Found
// - 500 Server Error
// - CORS issues
// - Undefined variables
// - API call failures

// Some warnings are OK (React dev mode, etc.)
```

### Check Local Storage:

```javascript
// For authenticated features:
localStorage.getItem('adminToken')
// May be null for public pages
```

---

## Common Test Scenarios

### Scenario 1: No Backend Connection
**Expected:** Error message with retry button
**Verify:** Can retry after backend starts

### Scenario 2: Invalid Input
**Expected:** Validation error message
**Verify:** Error clears when user corrects input

### Scenario 3: Large File Upload
**Expected:** Error message about file size
**Verify:** Error appears before API call

### Scenario 4: Network Interruption
**Expected:** Network error message
**Verify:** Can retry when connection restored

### Scenario 5: Server Error (500)
**Expected:** Generic error message
**Verify:** Error message is helpful

---

## Performance Checklist

- [ ] Products load in < 2 seconds
- [ ] Form submission takes < 2 seconds
- [ ] File upload takes < 5 seconds (depends on file size)
- [ ] No UI freezing during loading
- [ ] Buttons disabled during submission (prevent double-submit)
- [ ] Images load with no layout shift

---

## Mobile Testing

### iPhone Simulator:
```bash
# Press Ctrl+Shift+M in Chrome DevTools
# Test at different screen sizes:
# - iPhone SE (375px)
# - iPhone 12 (390px)
# - iPhone 14 Pro Max (430px)
```

### Test on Mobile:
1. Form inputs are large enough to tap
2. Buttons are accessible
3. Images scale properly
4. Loading spinners are visible
5. Error messages are readable
6. Success notifications don't cover content

---

## Troubleshooting

### Issue: API returns 404
```
Check:
1. Backend server is running
2. Port is correct (5000)
3. VITE_API_URL is set correctly
4. No typos in endpoint names
```

### Issue: CORS Error
```
Check:
1. Backend has CORS middleware configured
2. Frontend origin is whitelisted
3. No credentials issue (withCredentials)
```

### Issue: Form fields not mapping correctly
```
Check:
1. Frontend uses camelCase (businessName)
2. Backend converts to snake_case (business_name)
3. No typos in field names
4. Validation messages are from backend
```

### Issue: Upload returns 413 Payload Too Large
```
Check:
1. File size < 5MB
2. Backend has correct size limits
3. No middleware intercepting too early
```

### Issue: Success but no data in database
```
Check:
1. Supabase is accessible
2. Database tables exist (products, inquiries)
3. API has correct database credentials
4. No database connection timeout
```

---

## Test Report Template

Use this to document your test results:

```markdown
# Frontend API Integration - Test Report

## Date: [DATE]
## Tester: [NAME]
## Environment: Local Dev

### Products Page
- [ ] Page loads successfully
- [ ] Products fetch from API
- [ ] Loading state appears
- [ ] Error handling works
- [ ] Filtering by size works
- [ ] Field names correct (price_range, delivery_time)
- [ ] WhatsApp link works
- [ ] Mobile responsive

**Issues Found:**
- [List any issues]

### Inquiry Form
- [ ] Page loads successfully
- [ ] Form validation works
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Field names correct (camelCase)
- [ ] Enum values work
- [ ] Mobile responsive

**Issues Found:**
- [List any issues]

### Custom Label Upload
- [ ] Page loads successfully
- [ ] File selection works
- [ ] Preview appears
- [ ] Upload succeeds
- [ ] URL displays and can copy
- [ ] File validation works
- [ ] Mobile responsive

**Issues Found:**
- [List any issues]

### Overall
- [ ] No console errors
- [ ] No network errors
- [ ] Performance acceptable
- [ ] User experience smooth

## Summary
[Overall assessment and recommendations]
```

---

## Next Steps

After testing:

1. **If all tests pass:**
   - Deploy to staging
   - Run production tests
   - Deploy to production

2. **If issues found:**
   - Document in issues
   - Fix in frontend or backend
   - Re-test
   - Tag issue as fixed

3. **Monitoring:**
   - Monitor error logs
   - Track API response times
   - Alert on failures
   - Collect user feedback

---

## Support

For issues or questions:
1. Check console errors
2. Check network tab
3. Review [FRONTEND_BACKEND_INTEGRATION.md](FRONTEND_BACKEND_INTEGRATION.md)
4. Check backend logs
5. Review [FRONTEND_ARCHITECTURE_GUIDE.md](FRONTEND_ARCHITECTURE_GUIDE.md)

