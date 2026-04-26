-- ============================================
-- KLASS JEWELRY — Supabase Database Schema
-- ============================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================

-- 1. Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  category text check (category in ('Rings','Necklaces','Earrings','Bracelets')),
  image text,
  description text,
  tags text[],
  bestseller boolean default false,
  is_new boolean default false,
  created_at timestamptz default now()
);

-- 2. Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  address text,
  total_price numeric(10,2) not null,
  status text default 'pending' check (status in ('pending','paid','shipped')),
  stripe_session_id text,
  created_at timestamptz default now()
);

-- 3. Order Items table
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null default 1,
  price_at_purchase numeric(10,2) not null,
  created_at timestamptz default now()
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Products: public can read
alter table products enable row level security;
create policy "Products are public" on products for select using (true);

-- Orders: only insert allowed publicly (via API with service key)
alter table orders enable row level security;
create policy "Allow insert orders" on orders for insert with check (true);

-- Order Items: only insert allowed publicly
alter table order_items enable row level security;
create policy "Allow insert order_items" on order_items for insert with check (true);

-- ============================================
-- Sample Product Data
-- ============================================

insert into products (name, price, category, description, bestseller, is_new) values
  ('Soleil Ring', 85.00, 'Rings', 'A delicate gold band with subtle texture. Perfect for everyday wear.', true, false),
  ('Luna Pendant', 120.00, 'Necklaces', 'An elegant crescent moon pendant on a fine gold chain.', true, true),
  ('Petal Earrings', 65.00, 'Earrings', 'Lightweight drop earrings with a delicate floral motif.', false, true),
  ('Arc Cuff', 145.00, 'Bracelets', 'A bold but refined open cuff bracelet with architectural shape.', true, false),
  ('Muse Ring', 95.00, 'Rings', 'A thin twisted gold band that stacks beautifully.', false, true),
  ('Halo Necklace', 155.00, 'Necklaces', 'A fine chain with a small circular pendant. Understated elegance.', true, false),
  ('Marquise Drops', 88.00, 'Earrings', 'Elongated marquise-shaped drops for all-day wear.', false, true),
  ('Eternity Band', 110.00, 'Rings', 'Classic eternity band set with delicate stones.', true, false),
  ('Vine Bracelet', 75.00, 'Bracelets', 'Slender chain bracelet with tiny leaf charms.', false, false),
  ('Orb Studs', 55.00, 'Earrings', 'Simple round stud earrings — a wardrobe essential.', false, false),
  ('Cascade Necklace', 135.00, 'Necklaces', 'Layered chains of varying lengths.', false, true),
  ('Apex Ring', 165.00, 'Rings', 'A sculptural ring with geometric peak. A statement piece.', false, false);
