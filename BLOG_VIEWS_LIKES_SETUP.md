# Blog Views and Likes Feature Setup

This document explains how to set up the views and likes feature for the blog.

## Overview

The blog now includes:
- **View tracking**: Automatically tracks when someone views a blog article
- **Like functionality**: Allows users to like/unlike articles
- **Visual display**: Shows view and like counts on blog posts

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/blog-stats-schema.sql`
4. Run the SQL script to create the necessary tables:
   - `blog_stats`: Stores view and like counts for each article
   - `blog_likes`: Tracks individual likes to prevent duplicate likes from the same user/IP

## Features

### View Tracking
- Views are automatically tracked when a user visits a blog post
- Views increment on each page load
- View counts are displayed prominently on blog posts

### Like Functionality
- Users can like/unlike articles by clicking the heart icon
- Likes are tracked by IP address to prevent duplicate likes
- The heart icon fills in red when an article is liked
- Like counts update in real-time

### Display Locations
- **Hero section**: Views and likes shown below the title (when featured image is present)
- **Author section**: Views and likes shown below author info (when no featured image)
- **Sidebar**: Engagement stats card showing views and likes

## API Endpoints

### GET/POST `/api/blog/[slug]/views`
- **GET**: Retrieves current view and like counts
- **POST**: Increments view count for the article

### GET/POST `/api/blog/[slug]/like`
- **GET**: Checks if the current user has liked the article
- **POST**: Toggles like status (like/unlike)

## Components

### `BlogStats` (Client Component)
- Interactive component that displays views and likes
- Handles view tracking on mount
- Allows users to like/unlike articles
- Located at: `components/blog/blog-stats.tsx`

### `BlogStatsDisplay` (Server Component)
- Simple display component for showing stats without interaction
- Can be used in listing pages
- Located at: `components/blog/blog-stats-display.tsx`

## Usage

The views and likes feature is automatically integrated into blog post pages. No additional configuration is needed after running the database migration.

## Security

- Row Level Security (RLS) is enabled on all tables
- Public users can read and update blog stats
- Likes are tracked by IP address to prevent abuse
- All API routes include error handling

## Notes

- Views are tracked per page load (no deduplication)
- Likes are tracked per IP address (prevents duplicate likes from same user)
- Stats are initialized automatically when articles are created
- If stats don't exist for an article, they default to 0

