import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    );

    console.log('Connected to Supabase');

    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admins')
      .select('*')
      .eq('username', 'admin')
      .single();

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('\nTo reset password, manually update in Supabase or delete this admin first.');
      process.exit(0);
    }

    // Use environment variable for password, or default (with warning)
    const password = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
    
    if (!process.env.ADMIN_DEFAULT_PASSWORD) {
      console.log('\n⚠️  WARNING: Using default password "admin123"');
      console.log('Set ADMIN_DEFAULT_PASSWORD in .env for a custom password');
      console.log('IMPORTANT: Change this password immediately after first login!\n');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin
    const { data: admin, error } = await supabase
      .from('admins')
      .insert({
        username: 'admin',
        password: hashedPassword,
        email: process.env.ADMIN_EMAIL || 'admin@shivuuaqua.com',
      })
      .select()
      .single();

    if (error) throw error;

    console.log('✓ Admin user created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('Login at: /admin/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
