import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shivuu-aqua');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('\nTo reset password, manually update in MongoDB or delete this admin first.');
      process.exit(0);
    }

    // Use environment variable for password, or default (with warning)
    const password = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
    
    if (!process.env.ADMIN_DEFAULT_PASSWORD) {
      console.log('\n⚠️  WARNING: Using default password "admin123"');
      console.log('Set ADMIN_DEFAULT_PASSWORD in .env for a custom password');
      console.log('IMPORTANT: Change this password immediately after first login!\n');
    }

    // Create new admin
    const admin = await Admin.create({
      username: 'admin',
      password: password,
      email: process.env.ADMIN_EMAIL || 'admin@shivuuaqua.com',
    });

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
