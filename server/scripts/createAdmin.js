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
      process.exit(0);
    }

    // Create new admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123', // CHANGE THIS IN PRODUCTION!
      email: 'admin@shivuuaqua.com',
    });

    console.log('✓ Admin user created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
