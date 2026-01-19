-- Supabase SQL Schema for Shivuu Aqua Suppliers
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  size VARCHAR(10) NOT NULL CHECK (size IN ('250ml', '500ml', '1L')),
  price_range VARCHAR(100),
  moq INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  delivery_time VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  bottle_size VARCHAR(10) NOT NULL CHECK (bottle_size IN ('250ml', '500ml', '1L')),
  quantity VARCHAR(100) NOT NULL,
  address TEXT,
  message TEXT,
  logo_url TEXT,
  label_style VARCHAR(50) CHECK (label_style IN ('Classic', 'Premium', 'Traditional')),
  status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Converted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admins Table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_products_size ON products(size);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_admins_username ON admins(username);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Products (public read access)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can manage products"
  ON products FOR ALL
  TO service_role
  USING (true);

-- RLS Policies for Inquiries (service role only)
CREATE POLICY "Service role can manage inquiries"
  ON inquiries FOR ALL
  TO service_role
  USING (true);

-- RLS Policies for Admins (service role only)
CREATE POLICY "Service role can manage admins"
  ON admins FOR ALL
  TO service_role
  USING (true);

-- Insert sample products (optional)
INSERT INTO products (size, price_range, moq, description, delivery_time) VALUES
  ('250ml', '₹8-12/bottle', 1000, 'Perfect for home and office use', '7-10 days'),
  ('500ml', '₹10-15/bottle', 500, 'Most popular size for families', '7-10 days'),
  ('1L', '₹15-20/bottle', 300, 'Best value for bulk orders', '7-10 days');
