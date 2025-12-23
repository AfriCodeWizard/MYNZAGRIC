# Migration from Decap CMS to Supabase Admin Dashboard

## Summary

The website has been successfully migrated from Decap CMS (formerly Netlify CMS) to a custom Supabase-based admin dashboard. This provides a more reliable, secure, and maintainable content management solution.

## What Changed

### Removed
- ✅ Decap CMS (`/admin` with `index.html`)
- ✅ GitHub OAuth authentication flow
- ✅ Markdown file-based content storage
- ✅ Netlify Identity integration
- ✅ All OAuth-related API routes

### Added
- ✅ Supabase authentication (email/password)
- ✅ PostgreSQL database with `articles` table
- ✅ Row Level Security (RLS) policies
- ✅ Supabase Storage for image uploads
- ✅ Modern admin dashboard at `/admin`
- ✅ Article CRUD operations
- ✅ Protected admin routes

## New File Structure

```
lib/
  supabase/
    client.ts          # Browser Supabase client
    server.ts          # Server Supabase client
    auth.ts            # Authentication utilities
    articles.ts        # Article CRUD functions

app/
  admin/
    layout.tsx         # Protected admin layout
    login/
      page.tsx         # Login page
    page.tsx           # Articles list
    articles/
      new/
        page.tsx      # Create article
      [id]/
        edit/
          page.tsx    # Edit article

components/
  admin/
    admin-nav.tsx      # Admin navigation
    articles-list.tsx  # Articles list component
    article-form.tsx   # Article create/edit form

supabase/
  schema.sql           # Database schema and RLS policies
```

## Database Schema

The `articles` table includes:
- Basic fields: `id`, `title`, `slug`, `content`, `cover_image`, `published`, `author_id`, `created_at`, `updated_at`
- Extended fields: `excerpt`, `category`, `tags`, `featured`, `author_name`, `author_avatar`, `author_bio`
- SEO fields: `seo_title`, `seo_description`, `seo_keywords`

## Security Features

1. **Row Level Security (RLS)**: Database-level security policies
   - Public users can only read published articles
   - Authenticated users can only manage their own articles

2. **Protected Routes**: All `/admin/*` routes require authentication
   - Automatic redirect to `/admin/login` if not authenticated
   - Session management via Supabase Auth

3. **Secure Image Storage**: Images stored in Supabase Storage with proper access controls

## Setup Instructions

See `README_ADMIN.md` for detailed setup instructions.

## Migration Steps for Existing Content

If you have existing markdown files in `content/blog/`, you'll need to:

1. Set up Supabase (see `README_ADMIN.md`)
2. Manually migrate articles by:
   - Creating articles in the new admin dashboard
   - Or writing a migration script to import from markdown files

## Benefits

1. **No OAuth Issues**: Email/password authentication is simpler and more reliable
2. **No URL Hash Problems**: Clean routing without hash-based authentication
3. **Better Performance**: Database queries are faster than file system reads
4. **Scalability**: Can handle thousands of articles efficiently
5. **Rich Features**: Built-in support for categories, tags, SEO, and more
6. **Security**: Database-level security with RLS policies
7. **Image Management**: Integrated image upload and storage

## Next Steps

1. Follow `README_ADMIN.md` to set up Supabase
2. Create your admin user account
3. Start creating articles in the new dashboard
4. (Optional) Migrate existing markdown content

