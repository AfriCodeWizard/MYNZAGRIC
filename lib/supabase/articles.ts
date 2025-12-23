import { createClient, createStaticClient } from './server'
import { BlogPost } from '../blog-data'
import { calculateReadingTime } from '../blog-data'

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  cover_image?: string
  published: boolean
  author_id: string
  created_at: string
  updated_at?: string
  excerpt?: string
  category?: string
  tags?: string[]
  featured?: boolean
  author_name?: string
  author_avatar?: string
  author_bio?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
}

export function articleToBlogPost(article: Article): BlogPost {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || '',
    content: article.content,
    featuredImage: article.cover_image,
    author: {
      name: article.author_name || 'Mynzagric Team',
      avatar: article.author_avatar,
      bio: article.author_bio,
    },
    publishedAt: article.created_at,
    updatedAt: article.updated_at,
    category: article.category || 'Uncategorized',
    tags: article.tags || [],
    readingTime: calculateReadingTime(article.content),
    featured: article.featured || false,
    draft: !article.published,
    seo: {
      title: article.seo_title,
      description: article.seo_description,
      keywords: article.seo_keywords,
    },
  }
}

export async function getAllArticles(publishedOnly: boolean = true, useStaticClient: boolean = false) {
  // Use static client for build-time data fetching (e.g., generateStaticParams)
  const supabase = useStaticClient 
    ? createStaticClient()
    : await createClient()
  
  // If static client is null (env vars not available), return empty array
  if (!supabase) {
    console.warn('Supabase client not available. Returning empty articles array.')
    return []
  }
  
  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (publishedOnly) {
    query = query.eq('published', true)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }
  
  return (data || []) as Article[]
}

export async function getArticleBySlug(slug: string, publishedOnly: boolean = true, useStaticClient: boolean = false) {
  const supabase = useStaticClient 
    ? createStaticClient()
    : await createClient()
  
  // If static client is null (env vars not available), return null
  if (!supabase) {
    console.warn('Supabase client not available. Returning null.')
    return null
  }
  
  let query = supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (publishedOnly) {
    query = query.eq('published', true)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching article:', error)
    return null
  }
  
  return data as Article | null
}

export async function getArticleById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching article:', error)
    return null
  }
  
  return data as Article | null
}

export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const { data, error } = await supabase
    .from('articles')
    .insert({
      ...article,
      author_id: user.id,
    })
    .select()
    .single()
  
  if (error) {
    throw error
  }
  
  return data as Article
}

export async function updateArticle(id: string, updates: Partial<Omit<Article, 'id' | 'author_id' | 'created_at'>>) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .eq('author_id', user.id) // Ensure user can only update their own articles
    .select()
    .single()
  
  if (error) {
    throw error
  }
  
  return data as Article
}

export async function deleteArticle(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)
    .eq('author_id', user.id) // Ensure user can only delete their own articles
  
  if (error) {
    throw error
  }
  
  return true
}



