# Admin Dashboard Setup Guide

This guide will help you set up the Supabase-based admin dashboard to replace Decap CMS.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Step 1: Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your project URL and anon key from Settings > API

## Step 2: Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL script to create the `articles` table and RLS policies

## Step 3: Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `images`
3. Set it to **Public** (so images can be accessed via public URLs)
4. Optionally, add a policy to allow authenticated users to upload:

```sql
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images');

-- Allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images');
```

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 5: Create Admin User

1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user" > "Create new user"
3. Enter an email and password for your admin account
4. Save the credentials - you'll use these to log into the admin dashboard

## Step 6: Test the Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin/login`
3. Log in with the credentials you created in Step 5
4. You should see the admin dashboard with an empty articles list
5. Click "New Article" to create your first article

## Features

- **Authentication**: Secure email/password authentication via Supabase
- **Article Management**: Create, read, update, and delete articles
- **Image Upload**: Upload images to Supabase Storage
- **Publish/Unpublish**: Control article visibility
- **Rich Metadata**: Support for categories, tags, SEO settings, and more
- **Row Level Security**: Database-level security ensures users can only manage their own articles

## Security Notes

- All admin routes are protected by authentication
- Row Level Security (RLS) policies ensure users can only access their own articles
- Public users can only read published articles
- Images are stored securely in Supabase Storage

## Troubleshooting

### "Unauthorized" errors
- Make sure you're logged in
- Check that your Supabase credentials are correct in `.env.local`
- Verify RLS policies are set up correctly

### Image upload fails
- Ensure the `images` bucket exists and is public
- Check that storage policies allow authenticated uploads
- Verify file size is under 5MB

### Articles not showing on public site
- Ensure articles are marked as "Published"
- Check that the Supabase client is configured correctly
- Verify RLS policies allow public read access to published articles

