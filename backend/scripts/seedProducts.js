import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const sampleProducts = [
  {
    size: '250ml',
    priceRange: '₹8-12 per bottle',
    MOQ: 500,
    description: 'Perfect for cafes and small restaurants. Compact size ideal for quick service.',
    deliveryTime: '3-5 business days',
  },
  {
    size: '500ml',
    priceRange: '₹10-15 per bottle',
    MOQ: 500,
    description: 'Most popular size for restaurants and hotels. Great for dining tables.',
    deliveryTime: '3-5 business days',
  },
  {
    size: '1L',
    priceRange: '₹15-20 per bottle',
    MOQ: 300,
    description: 'Ideal for events and large gatherings. Premium presentation.',
    deliveryTime: '3-5 business days',
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shivuu-aqua');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log('✓ Sample products added successfully!');
    console.log(`Added ${products.length} products`);
    
    products.forEach(product => {
      console.log(`  - ${product.size}: MOQ ${product.MOQ}, ${product.deliveryTime}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();
