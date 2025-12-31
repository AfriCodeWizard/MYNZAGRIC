import { createClient } from './supabase/server'

export interface BlogStats {
  views: number
  likes: number
}

export async function getBlogStats(articleId: string): Promise<BlogStats> {
  try {
    const supabase = await createClient()
    
    if (!supabase) {
      return { views: 0, likes: 0 }
    }
    
    const { data, error } = await supabase
      .from('blog_stats')
      .select('views, likes')
      .eq('article_id', articleId)
      .single()
    
    if (error && error.code === 'PGRST116') {
      // Stats don't exist, return defaults
      return { views: 0, likes: 0 }
    }
    
    if (error) {
      console.error('Error fetching blog stats:', error)
      return { views: 0, likes: 0 }
    }
    
    return {
      views: data?.views || 0,
      likes: data?.likes || 0,
    }
  } catch (error) {
    console.error('Error in getBlogStats:', error)
    return { views: 0, likes: 0 }
  }
}

export async function getBlogStatsBySlug(slug: string): Promise<BlogStats> {
  try {
    const supabase = await createClient()
    
    if (!supabase) {
      return { views: 0, likes: 0 }
    }
    
    // Get article by slug
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (articleError || !article) {
      return { views: 0, likes: 0 }
    }
    
    return getBlogStats(article.id)
  } catch (error) {
    console.error('Error in getBlogStatsBySlug:', error)
    return { views: 0, likes: 0 }
  }
}

