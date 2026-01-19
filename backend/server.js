import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables FIRST before any other imports
dotenv.config({ path: join(__dirname, '.env') });

// Debug: Check if env vars are loaded
console.log('Environment check:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Loaded' : '✗ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Loaded' : '✗ Missing');

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import inquiryRoutes from './routes/inquiry.js';
import productRoutes from './routes/product.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';

// Connect to Supabase before handling requests
connectDB();

// Initialize Express app
const app = express();

// Respect proxy headers (needed on Railway/Vercel) so rate limits see real IPs
app.set('trust proxy', 1);

// CORS Configuration - Allow all origins for Railway deployment
const corsOptions = {
  origin: '*',
  credentials: false,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api/', apiLimiter);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Shivuu Aqua Supplies Backend API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      inquiry: '/api/inquiry',
      upload: '/api/upload'
    }
  });
});

// Routes
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running with Supabase' });
});

// Error handling middleware
app.use(errorHandler);

// Start server - Listen on PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
