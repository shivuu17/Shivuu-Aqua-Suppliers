import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Ensure dotenv is loaded
dotenv.config();

// Create Supabase client lazily
let supabase = null;

export const getSupabase = () => {
  if (!supabase) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Missing Supabase credentials!');
      console.error('SUPABASE_URL:', SUPABASE_URL);
      console.error('SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing');
      console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
      process.exit(1);
    }

    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabase;
};

// For backward compatibility
export { getSupabase as supabase };

const connectDB = async () => {
  try {
    // Test Supabase connection
    const client = getSupabase();
    const { data, error } = await client.from('products').select('count');
    
    if (error) throw error;
    
    console.log('✓ Connected to Supabase');
  } catch (error) {
    console.warn('⚠️  Supabase connection warning:', error.message);
    console.warn('⚠️  Server will continue in limited mode');
    // Don't exit - let server run in dev mode without DB
  }
};

export default connectDB;
