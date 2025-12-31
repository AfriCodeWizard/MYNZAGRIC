import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createClient()
    
    // Get the article by slug
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (articleError || !article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Get or create blog stats for this article
    const { data: stats, error: statsError } = await supabase
      .from('blog_stats')
      .select('*')
      .eq('article_id', article.id)
      .single()
    
    if (statsError && statsError.code === 'PGRST116') {
      // Stats don't exist, create them
      const { data: newStats, error: createError } = await supabase
        .from('blog_stats')
        .insert({
          article_id: article.id,
          views: 1,
          likes: 0,
        })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating blog stats:', createError)
        return NextResponse.json(
          { error: 'Failed to create stats' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({ views: newStats.views, likes: newStats.likes })
    }
    
    if (statsError) {
      console.error('Error fetching blog stats:', statsError)
      return NextResponse.json(
        { error: 'Failed to fetch stats' },
        { status: 500 }
      )
    }
    
    // Increment views
    const { data: updatedStats, error: updateError } = await supabase
      .from('blog_stats')
      .update({ views: (stats.views || 0) + 1 })
      .eq('article_id', article.id)
      .select()
      .single()
    
    if (updateError) {
      console.error('Error updating views:', updateError)
      return NextResponse.json(
        { error: 'Failed to update views' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      views: updatedStats.views,
      likes: updatedStats.likes || 0,
    })
  } catch (error) {
    console.error('Error in views API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createClient()
    
    // Get the article by slug
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (articleError || !article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Get blog stats for this article
    const { data: stats, error: statsError } = await supabase
      .from('blog_stats')
      .select('*')
      .eq('article_id', article.id)
      .single()
    
    if (statsError && statsError.code === 'PGRST116') {
      // Stats don't exist, return defaults
      return NextResponse.json({ views: 0, likes: 0 })
    }
    
    if (statsError) {
      console.error('Error fetching blog stats:', statsError)
      return NextResponse.json(
        { error: 'Failed to fetch stats' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      views: stats.views || 0,
      likes: stats.likes || 0,
    })
  } catch (error) {
    console.error('Error in views API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

