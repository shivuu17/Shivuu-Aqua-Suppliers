import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables before reading them
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const connectDB = async () => {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('products').select('count');
    
    if (error) throw error;
    
    console.log('✓ Connected to Supabase');
  } catch (error) {
    console.warn('⚠️  Supabase connection warning:', error.message);
    console.warn('⚠️  Server will continue in limited mode');
    // Don't exit - let server run in dev mode without DB
  }
};

export default connectDB;
