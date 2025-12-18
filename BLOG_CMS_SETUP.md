# Blog CMS Setup Guide

This guide explains how to use the Decap CMS (formerly Netlify CMS) to manage blog posts on the Mynzagric website.

## Overview

The blog system uses **Decap CMS**, a Git-based content management system that allows you to add, edit, and publish blog posts without touching code. All content is stored as Markdown files in the `content/blog/` directory.

## Accessing the CMS

1. Navigate to `/admin` on your website (e.g., `https://mynzagric.com/admin`)
2. You'll be prompted to log in with your Git provider (GitHub, GitLab, or Bitbucket)
3. Once authenticated, you'll see the CMS interface

## Adding a New Blog Post

### Step 1: Create New Post
1. Click "New Blog Post" in the CMS interface
2. Fill in the required fields:

**Basic Information:**
- **Title**: The main headline of your blog post
- **Slug**: URL-friendly version (auto-generated from title, but you can edit it)
  - Example: "Getting Started with Drip Irrigation" → `getting-started-with-drip-irrigation`
- **Excerpt**: Short description (2-3 sentences) that appears in blog listings
- **Featured Image**: Upload or select an image (recommended: 1200x630px)

**Author Information:**
- **Author Name**: Your name or "Mynzagric Team"
- **Author Avatar**: Optional profile picture
- **Author Bio**: Optional short bio

**Publishing:**
- **Publish Date**: When the post should be published
- **Updated Date**: Optional, for tracking updates
- **Category**: Choose or create a category (e.g., "Farming Tips", "Irrigation", "Success Stories")
- **Tags**: Add relevant tags separated by commas (e.g., "irrigation, water management, farming tips")
- **Featured**: Check this box to feature the post on the blog homepage
- **Draft**: Check to hide from public view while editing

**SEO (Optional but Recommended):**
- **SEO Title**: Custom title for search engines (defaults to post title)
- **SEO Description**: Custom description for search engines (defaults to excerpt)
- **SEO Keywords**: Relevant keywords for SEO

**Content:**
- **Body**: Write your blog post content using Markdown
  - Supports headings, lists, links, images, code blocks, and more
  - See Markdown guide below

### Step 2: Save and Publish
1. Click "Save" to save as draft
2. Click "Publish" to make it live immediately
3. The post will appear on `/blog` and be accessible at `/blog/[slug]`

## Editing Existing Posts

1. Go to `/admin`
2. Click on "Blog Posts" in the sidebar
3. Click on the post you want to edit
4. Make your changes
5. Click "Save" or "Publish" to update

## Markdown Guide

The blog content uses Markdown, a simple formatting syntax. Here are the basics:

### Headings
```markdown
# Heading 1 (Main Title)
## Heading 2 (Section)
### Heading 3 (Subsection)
```

### Text Formatting
```markdown
**bold text**
*italic text*
[link text](https://example.com)
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2
  - Nested bullet

1. Numbered item 1
2. Numbered item 2
```

### Images
```markdown
![Alt text](/path/to/image.jpg)
```

### Blockquotes
```markdown
> This is a quote or highlighted text
```

### Code
```markdown
`inline code`

```
Code block
```
```

## Best Practices

### Writing Great Blog Posts

1. **Clear Structure**: Use headings to organize content
2. **Engaging Introduction**: Hook readers in the first paragraph
3. **Visual Content**: Include images, diagrams, or infographics
4. **Actionable Content**: Provide practical tips and advice
5. **SEO Optimization**: Use relevant keywords naturally
6. **Readable Length**: Aim for 800-2000 words for comprehensive posts

### Image Guidelines

- **Featured Images**: 1200x630px (16:9 aspect ratio)
- **Content Images**: Maximum width 1200px
- **Format**: JPG or WebP for photos, PNG for graphics
- **File Size**: Optimize images to keep file sizes small (<500KB)
- **Alt Text**: Always include descriptive alt text for accessibility

### Categories and Tags

- **Categories**: Use 5-10 broad categories (e.g., "Farming Tips", "Irrigation", "Success Stories")
- **Tags**: Use specific tags (e.g., "drip irrigation", "water efficiency", "avocado farming")
- **Consistency**: Use the same category/tag names across posts

## File Structure

Blog posts are stored as Markdown files in:
```
content/blog/
  ├── getting-started-with-drip-irrigation.md
  ├── avocado-farming-tips.md
  └── ...
```

Each file contains:
- **Front Matter**: YAML metadata at the top (title, author, dates, etc.)
- **Content**: Markdown content below the front matter

## Troubleshooting

### Can't Access /admin
- Ensure you're logged into your Git provider
- Check that the CMS is properly configured in `public/admin/config.yml`

### Images Not Uploading
- Check file size (should be under 5MB)
- Ensure you have write permissions to the repository
- Try using a different image format

### Changes Not Appearing
- After publishing, wait a few minutes for the site to rebuild
- Clear your browser cache
- Check that the post is not marked as "Draft"

### Markdown Not Rendering Correctly
- Ensure proper spacing between elements
- Check for unclosed tags or formatting
- Review the Markdown syntax guide above

## Advanced: Direct File Editing

If you prefer to edit files directly:

1. Navigate to `content/blog/` in your repository
2. Edit the `.md` file directly
3. Commit and push changes
4. The site will automatically rebuild

## Support

For technical issues or questions:
- Review the [Decap CMS Documentation](https://decapcms.org/docs/)
- Check the project's GitHub issues
- Contact the development team

## Example Blog Post Structure

```markdown
---
title: "Your Blog Post Title"
slug: "your-blog-post-slug"
excerpt: "A brief description that appears in listings"
featuredImage: "/path/to/image.jpg"
authorName: "Your Name"
publishedAt: "2024-12-18 10:00"
category: "Farming Tips"
tags:
  - "tag1"
  - "tag2"
featured: false
draft: false
---

Your blog post content starts here. Use Markdown to format your content.

## Section Heading

Write your content with clear sections and engaging content.
```

---

**Note**: This CMS requires Git authentication. Make sure you have the necessary permissions to commit to the repository.

