-- Create blog_stats table to track views and likes for blog posts
CREATE TABLE IF NOT EXISTS blog_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id)
);

-- Create index on article_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_blog_stats_article_id ON blog_stats(article_id);

-- Enable Row Level Security
ALTER TABLE blog_stats ENABLE ROW LEVEL SECURITY;

-- Policy: Public users can read blog stats
CREATE POLICY "Public can view blog stats"
  ON blog_stats
  FOR SELECT
  USING (true);

-- Policy: Public users can insert new blog stats (for new articles)
CREATE POLICY "Public can insert blog stats"
  ON blog_stats
  FOR INSERT
  WITH CHECK (true);

-- Policy: Public users can update blog stats (for views and likes)
CREATE POLICY "Public can update blog stats"
  ON blog_stats
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create table to track individual likes (to prevent duplicate likes from same user/IP)
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_ip TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, user_ip),
  UNIQUE(article_id, user_id)
);

-- Create index on article_id and user_ip for fast lookups
CREATE INDEX IF NOT EXISTS idx_blog_likes_article_id ON blog_likes(article_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user_ip ON blog_likes(user_ip);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user_id ON blog_likes(user_id);

-- Enable Row Level Security
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- Policy: Public users can read blog likes
CREATE POLICY "Public can view blog likes"
  ON blog_likes
  FOR SELECT
  USING (true);

-- Policy: Public users can insert blog likes
CREATE POLICY "Public can insert blog likes"
  ON blog_likes
  FOR INSERT
  WITH CHECK (true);

-- Policy: Public users can delete their own blog likes (unlike)
CREATE POLICY "Public can delete blog likes"
  ON blog_likes
  FOR DELETE
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_stats_updated_at
  BEFORE UPDATE ON blog_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_stats_updated_at();

-- Function to initialize blog stats for new articles
CREATE OR REPLACE FUNCTION initialize_blog_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO blog_stats (article_id, views, likes)
  VALUES (NEW.id, 0, 0)
  ON CONFLICT (article_id) DO NOTHING;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically create blog stats when a new article is created
CREATE TRIGGER initialize_blog_stats_on_article_insert
  AFTER INSERT ON articles
  FOR EACH ROW
  EXECUTE FUNCTION initialize_blog_stats();

