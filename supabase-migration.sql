-- ===================================================================
-- BRENOWORLD - SUPABASE MIGRATION SCRIPT
-- ===================================================================
-- Run this script in Supabase SQL Editor to set up the database
-- ===================================================================

-- Drop existing tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;

-- ===================================================================
-- CREATE TABLES
-- ===================================================================

-- Posts table (articles and thoughts)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('article', 'thought')),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  summary TEXT CHECK (char_length(summary) <= 500),
  content TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media items table (images and videos)
CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  title TEXT CHECK (char_length(title) <= 200),
  description TEXT CHECK (char_length(description) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tools table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 100),
  description TEXT CHECK (char_length(description) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playbooks table
CREATE TABLE playbooks (
  id TEXT PRIMARY KEY CHECK (id ~ '^[a-z0-9-]+$'),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 100),
  summary TEXT CHECK (char_length(summary) <= 500),
  steps JSONB,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cases table (case studies)
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  summary TEXT CHECK (char_length(summary) <= 500),
  result TEXT CHECK (char_length(result) <= 500),
  lessons JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trips table (travel history)
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL CHECK (char_length(country) BETWEEN 1 AND 100),
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 100),
  month TEXT CHECK (char_length(month) <= 10),
  year INTEGER NOT NULL CHECK (year BETWEEN 1900 AND 2100),
  description TEXT CHECK (char_length(description) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ===================================================================

CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_media_created_at ON media_items(created_at DESC);
CREATE INDEX idx_media_type ON media_items(type);
CREATE INDEX idx_tools_created_at ON tools(created_at);
CREATE INDEX idx_playbooks_created_at ON playbooks(created_at DESC);
CREATE INDEX idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX idx_trips_year_month ON trips(year DESC, month DESC);

-- ===================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ===================================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- CREATE RLS POLICIES
-- ===================================================================

-- PUBLIC READ ACCESS FOR ALL TABLES
CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON media_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tools FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON playbooks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON cases FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON trips FOR SELECT USING (true);

-- ADMIN WRITE ACCESS (authenticated users with admin role)
-- Posts
CREATE POLICY "Allow authenticated insert" ON posts FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON posts FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON posts FOR DELETE
  TO authenticated USING (true);

-- Media Items
CREATE POLICY "Allow authenticated insert" ON media_items FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON media_items FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON media_items FOR DELETE
  TO authenticated USING (true);

-- Tools
CREATE POLICY "Allow authenticated insert" ON tools FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tools FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON tools FOR DELETE
  TO authenticated USING (true);

-- Playbooks
CREATE POLICY "Allow authenticated insert" ON playbooks FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON playbooks FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON playbooks FOR DELETE
  TO authenticated USING (true);

-- Cases
CREATE POLICY "Allow authenticated insert" ON cases FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON cases FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON cases FOR DELETE
  TO authenticated USING (true);

-- Trips
CREATE POLICY "Allow authenticated insert" ON trips FOR INSERT
  TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON trips FOR UPDATE
  TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON trips FOR DELETE
  TO authenticated USING (true);

-- ===================================================================
-- CREATE HELPER FUNCTIONS
-- ===================================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT email = 'breno@familiapires.com.br'
    FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================================
-- GRANT PERMISSIONS
-- ===================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ===================================================================
-- MIGRATION COMPLETE
-- ===================================================================
-- Next steps:
-- 1. Configure Supabase Auth in the dashboard
-- 2. Add admin user: breno@familiapires.com.br
-- 3. Update your .env file with Supabase credentials
-- ===================================================================
