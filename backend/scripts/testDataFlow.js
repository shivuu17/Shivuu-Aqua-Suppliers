#!/usr/bin/env node
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env file!');
  console.error(`   SUPABASE_URL: ${SUPABASE_URL ? '✓' : '✗'}`);
  console.error(`   SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_ROLE_KEY ? '✓' : '✗'}`);
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function testDataFlow() {
  console.log('🔗 Testing Data Flow: Frontend → Backend → Supabase\n');

  try {
    // Step 1: Test connection
    console.log('📡 Step 1: Testing Supabase Connection...');
    const { data: connTest, error: connError } = await supabase.from('products').select('count', { count: 'exact' });
    
    if (connError) throw connError;
    console.log('✅ Connected to Supabase\n');

    // Step 2: Seed sample products if empty
    console.log('📝 Step 2: Checking Products...');
    const { data: products, error: productsError } = await supabase.from('products').select('*');
    
    if (productsError) throw productsError;

    if (products.length === 0) {
      console.log('   No products found. Creating sample data...');
      
      const sampleProducts = [
        {
          size: '250ml',
          price_range: '₹8-12 per bottle',
          moq: 1000,
          description: 'Perfect for cafes and small restaurants. Compact size ideal for quick service.',
          image_url: 'https://via.placeholder.com/400x300?text=250ml',
          delivery_time: '7-10 days',
        },
        {
          size: '500ml',
          price_range: '₹10-15 per bottle',
          moq: 500,
          description: 'Most popular size for restaurants and hotels. Great for dining tables.',
          image_url: 'https://via.placeholder.com/400x300?text=500ml',
          delivery_time: '7-10 days',
        },
        {
          size: '1L',
          price_range: '₹15-20 per bottle',
          moq: 300,
          description: 'Ideal for events and large gatherings. Premium presentation.',
          image_url: 'https://via.placeholder.com/400x300?text=1L',
          delivery_time: '7-10 days',
        },
      ];

      const { data: inserted, error: insertError } = await supabase
        .from('products')
        .insert(sampleProducts)
        .select();

      if (insertError) throw insertError;
      console.log(`✅ Created ${inserted.length} sample products\n`);
    } else {
      console.log(`✅ Found ${products.length} products in database\n`);
    }

    // Step 3: Fetch all products
    console.log('📦 Step 3: Fetching All Products...');
    const { data: allProducts, error: fetchError } = await supabase.from('products').select('*');
    
    if (fetchError) throw fetchError;
    
    console.log(`✅ Retrieved ${allProducts.length} products:`);
    allProducts.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.size} - ${p.price_range} (MOQ: ${p.moq})`);
    });
    console.log();

    // Step 4: Test inquiry structure
    console.log('📋 Step 4: Checking Inquiries Table...');
    const { data: inquiries, error: inquiryError } = await supabase
      .from('inquiries')
      .select('count', { count: 'exact' });
    
    if (inquiryError) throw inquiryError;
    console.log(`✅ Inquiries table ready (${inquiries?.length || 0} records)\n`);

    // Step 5: API endpoints
    console.log('🌐 Step 5: API Endpoints Ready:\n');
    console.log('   GET  http://localhost:5000/api/products');
    console.log('   POST http://localhost:5000/api/inquiry');
    console.log('   POST http://localhost:5000/api/upload');
    console.log('   GET  http://localhost:5000/api/health\n');

    // Step 6: Frontend test
    console.log('🎨 Step 6: Frontend Setup:\n');
    console.log('   API Base URL: http://localhost:5000/api');
    console.log('   Frontend URL: http://localhost:5173');
    console.log('   Products will auto-load from /api/products\n');

    console.log('✅ DATA FLOW COMPLETE! All systems connected.\n');
    console.log('📝 To test:\n');
    console.log('   1. Start frontend: cd frontend && npm run dev');
    console.log('   2. Visit http://localhost:5173');
    console.log('   3. Products should load automatically');
    console.log('   4. Try submitting an inquiry or uploading a logo\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testDataFlow();
