-- ============================================
-- FIX: Disable RLS on games table
-- This restores public read access to games
-- ============================================

-- Fix games table - disable RLS so storefront works
ALTER TABLE games DISABLE ROW LEVEL SECURITY;

-- Fix games table - also ensure any existing restrictive
-- policies are removed so public SELECT works again
DO $$ BEGIN
  DROP POLICY IF EXISTS "Allow public read games" ON games;
  DROP POLICY IF EXISTS "Allow full access games" ON games;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

-- Verify orders table has proper policies for checkout inserts
-- If orders RLS is blocking inserts, disable it too
DO $$ BEGIN
  ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

-- Disable RLS on all other tables since there's no user auth
DO $$ BEGIN
  ALTER TABLE coupons DISABLE ROW LEVEL SECURITY;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE activity_log DISABLE ROW LEVEL SECURITY;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;
