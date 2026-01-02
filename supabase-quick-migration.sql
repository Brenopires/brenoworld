-- BRENOWORLD - Quick Migration Script
-- Copy and paste this into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/sql/new

-- Create Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('article', 'thought')),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  summary TEXT CHECK (char_length(summary) <= 500),
  content TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Media Items table
CREATE TABLE IF NOT EXISTS media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  title TEXT CHECK (char_length(title) <= 200),
  description TEXT CHECK (char_length(description) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 100),
  description TEXT CHECK (char_length(description) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Playbooks table
CREATE TABLE IF NOT EXISTS playbooks (
  id TEXT PRIMARY KEY CHECK (id ~ '^[a-z0-9-]+$'),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 100),
  summary TEXT CHECK (char_length(summary) <= 500),
  steps JSONB,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Cases table
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  summary TEXT CHECK (char_length(summary) <= 500),
  result TEXT CHECK (char_length(result) <= 500),
  lessons JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL CHECK (char_length(country) BETWEEN 1 AND 100),
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 100),
  month TEXT CHECK (char_length(month) <= 10),
  year INTEGER NOT NULL CHECK (year BETWEEN 1900 AND 2100),
  description TEXT CHECK (char_length(description) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_type ON media_items(type);
CREATE INDEX IF NOT EXISTS idx_tools_created_at ON tools(created_at);
CREATE INDEX IF NOT EXISTS idx_playbooks_created_at ON playbooks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trips_year_month ON trips(year DESC, month DESC);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read access" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON media_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tools FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON playbooks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON cases FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON trips FOR SELECT USING (true);

-- Authenticated Write Policies - Posts
CREATE POLICY "Allow authenticated insert" ON posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON posts FOR DELETE TO authenticated USING (true);

-- Authenticated Write Policies - Media Items
CREATE POLICY "Allow authenticated insert" ON media_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON media_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON media_items FOR DELETE TO authenticated USING (true);

-- Authenticated Write Policies - Tools
CREATE POLICY "Allow authenticated insert" ON tools FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON tools FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON tools FOR DELETE TO authenticated USING (true);

-- Authenticated Write Policies - Playbooks
CREATE POLICY "Allow authenticated insert" ON playbooks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON playbooks FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON playbooks FOR DELETE TO authenticated USING (true);

-- Authenticated Write Policies - Cases
CREATE POLICY "Allow authenticated insert" ON cases FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON cases FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON cases FOR DELETE TO authenticated USING (true);

-- Authenticated Write Policies - Trips
CREATE POLICY "Allow authenticated insert" ON trips FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON trips FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON trips FOR DELETE TO authenticated USING (true);

-- Grant Permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
