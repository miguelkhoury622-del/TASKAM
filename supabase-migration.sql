-- ============================================================
-- TASKAM DATABASE MIGRATION
-- Run this in Supabase → SQL Editor → New Query → Run
-- ============================================================

-- USERS (customers)
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150),
  phone       VARCHAR(20),
  avatar_url  TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ADDRESSES
CREATE TABLE IF NOT EXISTS addresses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  label       VARCHAR(50),
  street      TEXT NOT NULL,
  city        VARCHAR(100) NOT NULL,
  state       VARCHAR(100) NOT NULL,
  latitude    DECIMAL(10, 8),
  longitude   DECIMAL(11, 8),
  is_default  BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ADMINS
CREATE TABLE IF NOT EXISTS admins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  role        VARCHAR(50) DEFAULT 'support',
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- TECHNICIANS
CREATE TABLE IF NOT EXISTS technicians (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name              VARCHAR(100) NOT NULL,
  email             VARCHAR(150),
  phone             VARCHAR(20) NOT NULL,
  avatar_url        TEXT,
  bio               TEXT,
  id_document_url   TEXT,
  status            VARCHAR(20) DEFAULT 'pending',
  rating            DECIMAL(3,2) DEFAULT 0.00,
  total_jobs        INTEGER DEFAULT 0,
  bank_name         VARCHAR(100),
  account_number    VARCHAR(20),
  account_name      VARCHAR(100),
  is_available      BOOLEAN DEFAULT true,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- TECHNICIAN AVAILABILITY
CREATE TABLE IF NOT EXISTS technician_availability (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id   UUID REFERENCES technicians(id) ON DELETE CASCADE,
  day_of_week     SMALLINT NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  is_available    BOOLEAN DEFAULT true
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  icon_url    TEXT,
  emoji       VARCHAR(10),
  description TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id       UUID REFERENCES categories(id) ON DELETE CASCADE,
  name              VARCHAR(150) NOT NULL,
  description       TEXT,
  base_price        DECIMAL(10,2) NOT NULL,
  original_price    DECIMAL(10,2),
  price_unit        VARCHAR(20) DEFAULT 'fixed',
  duration_minutes  INTEGER,
  emoji             VARCHAR(10),
  image_url         TEXT,
  badge             VARCHAR(50),
  is_active         BOOLEAN DEFAULT true,
  is_featured       BOOLEAN DEFAULT false,
  created_at        TIMESTAMP DEFAULT NOW()
);

-- TECHNICIAN SERVICES
CREATE TABLE IF NOT EXISTS technician_services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id   UUID REFERENCES technicians(id) ON DELETE CASCADE,
  service_id      UUID REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE(technician_id, service_id)
);

-- PROMO CODES
CREATE TABLE IF NOT EXISTS promo_codes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code              VARCHAR(50) UNIQUE NOT NULL,
  discount_type     VARCHAR(20) NOT NULL,
  discount_value    DECIMAL(10,2) NOT NULL,
  min_order_amount  DECIMAL(10,2) DEFAULT 0,
  max_uses          INTEGER,
  used_count        INTEGER DEFAULT 0,
  expires_at        TIMESTAMP,
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMP DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       UUID REFERENCES users(id),
  technician_id     UUID REFERENCES technicians(id),
  service_id        UUID REFERENCES services(id),
  address_id        UUID REFERENCES addresses(id),
  scheduled_date    DATE NOT NULL,
  scheduled_time    TIME NOT NULL,
  status            VARCHAR(30) DEFAULT 'pending',
  total_amount      DECIMAL(10,2) NOT NULL,
  payment_method    VARCHAR(20) DEFAULT 'cash',
  payment_status    VARCHAR(20) DEFAULT 'unpaid',
  promo_code_id     UUID REFERENCES promo_codes(id),
  discount_amount   DECIMAL(10,2) DEFAULT 0,
  customer_notes    TEXT,
  cancellation_reason TEXT,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id          UUID REFERENCES bookings(id),
  customer_id         UUID REFERENCES users(id),
  amount              DECIMAL(10,2) NOT NULL,
  method              VARCHAR(20) NOT NULL,
  status              VARCHAR(20) DEFAULT 'pending',
  paystack_reference  VARCHAR(100) UNIQUE,
  paid_at             TIMESTAMP,
  created_at          TIMESTAMP DEFAULT NOW()
);

-- PAYOUTS
CREATE TABLE IF NOT EXISTS payouts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id   UUID REFERENCES technicians(id),
  amount          DECIMAL(10,2) NOT NULL,
  status          VARCHAR(20) DEFAULT 'pending',
  reference       VARCHAR(100) UNIQUE,
  processed_at    TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID REFERENCES bookings(id) UNIQUE,
  customer_id     UUID REFERENCES users(id),
  technician_id   UUID REFERENCES technicians(id),
  rating          SMALLINT CHECK (rating BETWEEN 1 AND 5),
  comment         TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id     UUID NOT NULL,
  sender_type   VARCHAR(20) NOT NULL,
  content       TEXT NOT NULL,
  read_at       TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receiver_id   UUID NOT NULL,
  receiver_type VARCHAR(20) NOT NULL,
  title         VARCHAR(200) NOT NULL,
  body          TEXT,
  type          VARCHAR(50),
  is_read       BOOLEAN DEFAULT false,
  data          JSONB,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- PROMO CODE USES
CREATE TABLE IF NOT EXISTS promo_code_uses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id   UUID REFERENCES promo_codes(id),
  customer_id     UUID REFERENCES users(id),
  booking_id      UUID REFERENCES bookings(id),
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

-- Public read for categories and services
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);

-- Users can read/update their own profile
CREATE POLICY "Users read own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses
CREATE POLICY "Users manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Bookings
CREATE POLICY "Customers see own bookings" ON bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers update own bookings" ON bookings FOR UPDATE USING (auth.uid() = customer_id);

-- Technicians
CREATE POLICY "Technicians read own profile" ON technicians FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Technicians update own profile" ON technicians FOR UPDATE USING (auth.uid() = auth_id);
CREATE POLICY "Technicians insert own profile" ON technicians FOR INSERT WITH CHECK (auth.uid() = auth_id);
CREATE POLICY "Public can read approved technicians" ON technicians FOR SELECT USING (status = 'approved');

-- Reviews
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Customers create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Messages
CREATE POLICY "Booking parties can read messages" ON messages FOR SELECT USING (auth.uid() = sender_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT USING (auth.uid() = receiver_id);

-- Payments
CREATE POLICY "Customers see own payments" ON payments FOR SELECT USING (auth.uid() = customer_id);

-- ============================================================
-- SEED DATA — Categories
-- ============================================================

INSERT INTO categories (name, emoji, description, sort_order) VALUES
  ('Cleaning', '🧹', 'Professional home and office cleaning services', 1),
  ('Plumbing', '🔧', 'Pipe repairs, installations and maintenance', 2),
  ('Electrical', '⚡', 'Wiring, installations and electrical repairs', 3),
  ('Appliances', '❄️', 'Repair and installation of home appliances', 4),
  ('Painting', '🎨', 'Interior and exterior painting services', 5),
  ('Repairs', '🔨', 'General home repairs and maintenance', 6),
  ('Assembly', '🪑', 'Furniture assembly and installation', 7),
  ('Landscaping', '🌿', 'Garden and outdoor maintenance', 8),
  ('Security', '🔒', 'Security systems and door installations', 9),
  ('Moving', '📦', 'Home and office moving services', 10)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA — Services
-- ============================================================

INSERT INTO services (category_id, name, description, base_price, original_price, duration_minutes, emoji, badge, is_featured)
SELECT
  c.id,
  s.name,
  s.description,
  s.base_price,
  s.original_price,
  s.duration_minutes,
  s.emoji,
  s.badge,
  s.is_featured
FROM (VALUES
  ('Cleaning', 'Deep House Cleaning', 'Full deep clean of your entire home including kitchen, bathrooms, bedrooms and living areas.', 15000, 25000, 240, '🧹', 'Best Seller', true),
  ('Cleaning', 'Bathroom Deep Clean', 'Thorough scrubbing and sanitization of all bathroom surfaces.', 8000, NULL, 90, '🚿', NULL, false),
  ('Cleaning', 'Office Cleaning', 'Professional cleaning for offices and commercial spaces.', 20000, NULL, 180, '🏢', NULL, false),
  ('Plumbing', 'Pipe Repair & Replacement', 'Fix leaking, burst or blocked pipes quickly and professionally.', 12000, NULL, 120, '🔧', 'Popular', true),
  ('Plumbing', 'Toilet Installation', 'Supply and install new toilet fixtures.', 15000, NULL, 180, '🚽', NULL, false),
  ('Electrical', 'Electrical Wiring & Repairs', 'Safe and certified electrical wiring, rewiring and repairs.', 12000, NULL, 240, '⚡', NULL, true),
  ('Electrical', 'Generator Installation', 'Professional generator connection and installation.', 25000, NULL, 300, '🔌', NULL, false),
  ('Appliances', 'AC Installation & Service', 'Install, service or repair your air conditioning unit.', 20000, 30000, 180, '❄️', '40% Off', true),
  ('Appliances', 'Washing Machine Repair', 'Diagnose and repair all washing machine faults.', 10000, NULL, 90, '🌀', NULL, false),
  ('Painting', 'Interior Painting', 'Professional interior wall painting with quality emulsion.', 35000, 50000, 1440, '🎨', '30% Off', true),
  ('Painting', 'Wall Texturing', 'Decorative wall texturing and finishing.', 20000, NULL, 720, '🖌️', NULL, false),
  ('Assembly', 'Furniture Assembly', 'Professional assembly of all furniture types.', 6000, NULL, 120, '🪑', 'New', false)
) AS s(category_name, name, description, base_price, original_price, duration_minutes, emoji, badge, is_featured)
JOIN categories c ON c.name = s.category_name
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA — Promo Code
-- ============================================================

INSERT INTO promo_codes (code, discount_type, discount_value, min_order_amount, max_uses, is_active)
VALUES ('TASKAM10', 'percentage', 10, 5000, 100, true)
ON CONFLICT DO NOTHING;
