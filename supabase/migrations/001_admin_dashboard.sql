-- ============================================
-- GameVerse Admin Dashboard - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add stock column to games table
ALTER TABLE games ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 100;
ALTER TABLE games ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- 2. Enhanced orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS utr TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_code TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount_amount NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'UPI';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE orders ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_address TEXT DEFAULT '';

-- 3. Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  subtotal NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL,
  min_purchase NUMERIC DEFAULT 0,
  max_discount NUMERIC DEFAULT 0,
  usage_limit INTEGER DEFAULT 0,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT DEFAULT '',
  comment TEXT DEFAULT '',
  is_approved BOOLEAN DEFAULT false,
  is_hidden BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  admin_reply TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Activity log table
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT DEFAULT '',
  entity_name TEXT DEFAULT '',
  details TEXT DEFAULT '',
  admin_user TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  order_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_reviews_game ON reviews(game_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_email ON notifications(customer_email);
