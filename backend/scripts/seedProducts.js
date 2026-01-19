import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const sampleProducts = [
  {
    size: '250ml',
    price_range: '₹8-12 per bottle',
    moq: 500,
    description: 'Perfect for cafes and small restaurants. Compact size ideal for quick service.',
    delivery_time: '3-5 business days',
  },
  {
    size: '500ml',
    price_range: '₹10-15 per bottle',
    moq: 500,
    description: 'Most popular size for restaurants and hotels. Great for dining tables.',
    delivery_time: '3-5 business days',
  },
  {
    size: '1L',
    price_range: '₹15-20 per bottle',
    moq: 300,
    description: 'Ideal for events and large gatherings. Premium presentation.',
    delivery_time: '3-5 business days',
  },
];

const seedProducts = async () => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    );

    console.log('Connected to Supabase');

    // Clear existing products
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.log('Note: Could not clear existing products:', deleteError.message);
    } else {
      console.log('Cleared existing products');
    }

    // Insert sample products
    const { data: products, error: insertError } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();

    if (insertError) throw insertError;

    console.log('✓ Sample products added successfully!');
    console.log(`Added ${products.length} products`);
    
    products.forEach(product => {
      console.log(`  - ${product.size}: MOQ ${product.moq}, ${product.delivery_time}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();
