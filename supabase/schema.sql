-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Additional fields for compatibility with existing blog structure
  excerpt TEXT,
  category TEXT DEFAULT 'Uncategorized',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN DEFAULT false,
  author_name TEXT DEFAULT 'Mynzagric Team',
  author_avatar TEXT,
  author_bio TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[]
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Create index on published and created_at for public queries
CREATE INDEX IF NOT EXISTS idx_articles_published_created ON articles(published, created_at DESC);

-- Create index on author_id for user queries
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Public users can read published articles only
CREATE POLICY "Public can view published articles"
  ON articles
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can read their own articles (published or unpublished)
CREATE POLICY "Users can view their own articles"
  ON articles
  FOR SELECT
  USING (auth.uid() = author_id);

-- Policy: Authenticated users can insert their own articles
CREATE POLICY "Users can insert their own articles"
  ON articles
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authenticated users can update their own articles
CREATE POLICY "Users can update their own articles"
  ON articles
  FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policy: Authenticated users can delete their own articles
CREATE POLICY "Users can delete their own articles"
  ON articles
  FOR DELETE
  USING (auth.uid() = author_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();



