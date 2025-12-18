import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from './blog-data'
import { calculateReadingTime } from './blog-data'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Calculate reading time
    const readingTime = calculateReadingTime(content)
    
    // Parse tags (handle both array and comma-separated string)
    let tags: string[] = []
    if (data.tags) {
      if (Array.isArray(data.tags)) {
        tags = data.tags
      } else if (typeof data.tags === 'string') {
        tags = data.tags.split(',').map(t => t.trim()).filter(Boolean)
      }
    }
    
    const post: BlogPost = {
      id: data.slug || slug,
      slug: data.slug || slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: content,
      featuredImage: data.featuredImage || '',
      author: {
        name: data.authorName || 'Mynzagric Team',
        avatar: data.authorAvatar || undefined,
        bio: data.authorBio || undefined,
      },
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt || undefined,
      category: data.category || 'Uncategorized',
      tags: tags,
      readingTime: readingTime,
      featured: data.featured || false,
      draft: data.draft || false,
      seo: {
        title: data.seoTitle || undefined,
        description: data.seoDescription || undefined,
        keywords: data.seoKeywords || tags,
      },
    }
    
    return post
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    
    const slugs = getAllPostSlugs()
    const posts = slugs
      .map(slug => getPostBySlug(slug))
      .filter((post): post is BlogPost => post !== null)
    
    return posts
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

