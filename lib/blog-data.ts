export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  readingTime: number
  featured?: boolean
  draft?: boolean
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// Import loader functions
import { getAllPosts as loadAllPosts, getPostBySlug as loadPostBySlug, getAllPostSlugs as loadAllPostSlugs } from './blog-loader'

// Load posts from markdown files
export const blogPosts: BlogPost[] = typeof window === 'undefined' ? loadAllPosts() : []

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (typeof window !== 'undefined') {
    // Client-side: use in-memory array
    return blogPosts.find(post => post.slug === slug && !post.draft)
  }
  // Server-side: load from file system
  const post = loadPostBySlug(slug)
  return post && !post.draft ? post : undefined
}

export function getAllPostSlugs(): string[] {
  if (typeof window !== 'undefined') {
    // Client-side: use in-memory array
    return blogPosts
      .filter(post => !post.draft)
      .map(post => post.slug)
  }
  // Server-side: load from file system
  return loadAllPostSlugs()
}

export function getFeaturedPosts(): BlogPost[] {
  const posts = typeof window === 'undefined' ? loadAllPosts() : blogPosts
  return posts
    .filter(post => post.featured && !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = typeof window === 'undefined' ? loadAllPosts() : blogPosts
  return posts
    .filter(post => post.category === category && !post.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getAllCategories(): string[] {
  const posts = typeof window === 'undefined' ? loadAllPosts() : blogPosts
  const categories = new Set(posts.filter(post => !post.draft).map(post => post.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = typeof window === 'undefined' ? loadAllPosts() : blogPosts
  const tags = new Set(posts.filter(post => !post.draft).flatMap(post => post.tags))
  return Array.from(tags).sort()
}

// Calculate reading time from content (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

