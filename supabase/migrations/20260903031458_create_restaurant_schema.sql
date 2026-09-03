/*
# Restaurant Website Schema

1. New Tables
- `categories` — menu item categories (Appetizers, Main Courses, Desserts, Beverages, etc.)
  - id (uuid, PK)
  - name (text, not null)
  - slug (text, unique, not null)
  - display_order (int, default 0)
  - created_at (timestamp)
- `menu_items` — individual dishes on the menu
  - id (uuid, PK)
  - category_id (uuid, FK -> categories.id)
  - name (text, not null)
  - description (text)
  - price (numeric, not null)
  - image_url (text)
  - is_featured (boolean, default false)
  - is_available (boolean, default true)
  - dietary_tags (text[]) — e.g. vegetarian, vegan, gluten-free, spicy
  - display_order (int, default 0)
  - created_at (timestamp)
- `reservations` — table booking requests from customers
  - id (uuid, PK)
  - name (text, not null)
  - email (text, not null)
  - phone (text)
  - party_size (int, not null)
  - reservation_date (date, not null)
  - reservation_time (time, not null)
  - special_requests (text)
  - status (text, default 'pending') — pending, confirmed, cancelled
  - created_at (timestamp)
- `contact_messages` — messages submitted via the contact form
  - id (uuid, PK)
  - name (text, not null)
  - email (text, not null)
  - subject (text)
  - message (text, not null)
  - is_read (boolean, default false)
  - created_at (timestamp)
- `testimonials` — customer reviews displayed on the site
  - id (uuid, PK)
  - author_name (text, not null)
  - author_role (text) — e.g. "Food Critic", "Regular Guest"
  - rating (int, 1-5)
  - content (text, not null)
  - display_order (int, default 0)
  - created_at (timestamp)
- `gallery_images` — images shown in the gallery section
  - id (uuid, PK)
  - title (text)
  - image_url (text, not null)
  - category (text) — e.g. interior, food, chef
  - display_order (int, default 0)
  - created_at (timestamp)
- `restaurant_info` — single-row key/value store for restaurant details
  - id (uuid, PK)
  - name (text)
  - tagline (text)
  - description (text)
  - address (text)
  - phone (text)
  - email (text)
  - hours_mon_fri (text)
  - hours_sat_sun (text)
  - hero_image_url (text)
  - about_image_url (text)

2. Security
- This is a no-auth public website. All tables use `TO anon, authenticated` policies.
- Public read access for categories, menu_items, testimonials, gallery_images, restaurant_info.
- Public insert for reservations and contact_messages (customers submit these).
- No update or delete policies from the anon role (admin operations would require auth).

3. Important Notes
- The website is a public-facing restaurant site with no login.
- Visitors can browse the menu, view gallery, read testimonials, and make reservations.
- Reservations default to 'pending' status — restaurant staff would confirm them via admin tools (not built in this version).
*/

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_available boolean NOT NULL DEFAULT true,
  dietary_tags text[] DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu_items" ON menu_items;
CREATE POLICY "anon_select_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  party_size int NOT NULL,
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  special_requests text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT
  TO anon, authenticated USING (true);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'food',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_gallery_images" ON gallery_images;
CREATE POLICY "anon_select_gallery_images" ON gallery_images FOR SELECT
  TO anon, authenticated USING (true);

-- Restaurant Info (single row)
CREATE TABLE IF NOT EXISTS restaurant_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  tagline text,
  description text,
  address text,
  phone text,
  email text,
  hours_mon_fri text,
  hours_sat_sun text,
  hero_image_url text,
  about_image_url text
);

ALTER TABLE restaurant_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_restaurant_info" ON restaurant_info;
CREATE POLICY "anon_select_restaurant_info" ON restaurant_info FOR SELECT
  TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery_images(display_order);
