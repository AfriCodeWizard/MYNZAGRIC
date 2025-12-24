-- Fix: Add policy to allow authenticated users to read their own articles
-- This policy allows users to see their own articles (both published and unpublished)
-- in the admin dashboard

-- Drop the policy if it already exists (in case you need to re-run this)
DROP POLICY IF EXISTS "Users can view their own articles" ON articles;

-- Create the policy to allow authenticated users to read their own articles
CREATE POLICY "Users can view their own articles"
  ON articles
  FOR SELECT
  USING (auth.uid() = author_id);

