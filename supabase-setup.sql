-- ═══════════════════════════════════════════════════════════
--  MenuCraft Pro — Supabase Database Setup
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- ── Tables ───────────────────────────────────────────────────

CREATE TABLE restaurants (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id   UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  logo_url   TEXT,
  theme      JSONB DEFAULT '{}',
  settings   JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category      TEXT,
  name          TEXT NOT NULL,
  description   TEXT,
  price         DECIMAL(10,2),
  image_url     TEXT,
  available     BOOLEAN DEFAULT true,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_views (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  device_type   TEXT,
  viewed_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id   UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  items           JSONB NOT NULL,
  total           DECIMAL(10,2),
  customer_name   TEXT,
  customer_phone  TEXT,
  status          TEXT DEFAULT 'pending',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Storage Bucket ────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT DO NOTHING;

-- ── Row Level Security ─────────────────────────────────────────

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_views  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;

-- Restaurants: only owner
CREATE POLICY "owner_all_restaurants" ON restaurants
  FOR ALL USING (auth.uid() = owner_id);

-- Menu items: owner manages, public reads available items
CREATE POLICY "owner_all_items" ON menu_items
  FOR ALL USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
  );
CREATE POLICY "public_read_items" ON menu_items
  FOR SELECT USING (available = true);

-- Views: anyone inserts, owner reads
CREATE POLICY "public_insert_views" ON menu_views
  FOR INSERT WITH CHECK (true);
CREATE POLICY "owner_read_views" ON menu_views
  FOR SELECT USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
  );

-- Orders: anyone inserts, owner manages
CREATE POLICY "public_insert_orders" ON orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "owner_all_orders" ON orders
  FOR ALL USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
  );

-- Storage: anyone reads, authenticated uploads
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "auth_upload_images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'authenticated');

-- ── Indexes for performance ───────────────────────────────────

CREATE INDEX idx_items_restaurant  ON menu_items(restaurant_id);
CREATE INDEX idx_views_restaurant  ON menu_views(restaurant_id);
CREATE INDEX idx_views_date        ON menu_views(viewed_at);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_date       ON orders(created_at);
CREATE INDEX idx_restaurants_slug  ON restaurants(slug);
