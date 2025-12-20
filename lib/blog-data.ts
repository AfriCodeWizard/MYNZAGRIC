export interface BlogAuthor {
  name: string
  avatar?: string
  bio?: string
}

export interface BlogSEO {
  title?: string
  description?: string
  keywords?: string[]
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage?: string
  author: BlogAuthor
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  readingTime: number
  featured: boolean
  draft: boolean
  seo: BlogSEO
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

// getAllPostSlugs is exported from blog-loader.ts
// Import it directly: import { getAllPostSlugs } from '@/lib/blog-loader'

