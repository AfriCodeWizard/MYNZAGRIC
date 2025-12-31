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
    
    // Get user IP from request headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Check if user has already liked this article
    const { data: existingLike, error: likeCheckError } = await supabase
      .from('blog_likes')
      .select('*')
      .eq('article_id', article.id)
      .eq('user_ip', ip)
      .maybeSingle()
    
    if (likeCheckError && likeCheckError.code !== 'PGRST116') {
      console.error('Error checking existing like:', likeCheckError)
      return NextResponse.json(
        { error: 'Failed to check like status' },
        { status: 500 }
      )
    }
    
    // Get or create blog stats
    let stats = await supabase
      .from('blog_stats')
      .select('*')
      .eq('article_id', article.id)
      .single()
    
    if (stats.error && stats.error.code === 'PGRST116') {
      // Stats don't exist, create them
      const { data: newStats, error: createError } = await supabase
        .from('blog_stats')
        .insert({
          article_id: article.id,
          views: 0,
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
      
      stats = { data: newStats, error: null }
    }
    
    if (stats.error) {
      console.error('Error fetching blog stats:', stats.error)
      return NextResponse.json(
        { error: 'Failed to fetch stats' },
        { status: 500 }
      )
    }
    
    const currentStats = stats.data
    
    if (existingLike) {
      // User has already liked, so unlike (remove like)
      const { error: deleteError } = await supabase
        .from('blog_likes')
        .delete()
        .eq('article_id', article.id)
        .eq('user_ip', ip)
      
      if (deleteError) {
        console.error('Error removing like:', deleteError)
        return NextResponse.json(
          { error: 'Failed to remove like' },
          { status: 500 }
        )
      }
      
      // Decrement likes count
      const { data: updatedStats, error: updateError } = await supabase
        .from('blog_stats')
        .update({ likes: Math.max(0, (currentStats.likes || 0) - 1) })
        .eq('article_id', article.id)
        .select()
        .single()
      
      if (updateError) {
        console.error('Error updating likes:', updateError)
        return NextResponse.json(
          { error: 'Failed to update likes' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        views: updatedStats.views || 0,
        likes: updatedStats.likes || 0,
        liked: false,
      })
    } else {
      // User hasn't liked yet, so add like
      const { error: insertError } = await supabase
        .from('blog_likes')
        .insert({
          article_id: article.id,
          user_ip: ip,
        })
      
      if (insertError) {
        console.error('Error adding like:', insertError)
        return NextResponse.json(
          { error: 'Failed to add like' },
          { status: 500 }
        )
      }
      
      // Increment likes count
      const { data: updatedStats, error: updateError } = await supabase
        .from('blog_stats')
        .update({ likes: (currentStats.likes || 0) + 1 })
        .eq('article_id', article.id)
        .select()
        .single()
      
      if (updateError) {
        console.error('Error updating likes:', updateError)
        return NextResponse.json(
          { error: 'Failed to update likes' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        views: updatedStats.views || 0,
        likes: updatedStats.likes || 0,
        liked: true,
      })
    }
  } catch (error) {
    console.error('Error in like API:', error)
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
    
    // Get user IP from request headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Check if user has liked this article
    const { data: existingLike, error: likeCheckError } = await supabase
      .from('blog_likes')
      .select('*')
      .eq('article_id', article.id)
      .eq('user_ip', ip)
      .maybeSingle()
    
    if (likeCheckError && likeCheckError.code !== 'PGRST116') {
      console.error('Error checking like status:', likeCheckError)
      return NextResponse.json(
        { error: 'Failed to check like status' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      liked: !!existingLike,
    })
  } catch (error) {
    console.error('Error in like API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

