'use client'

import { useState, useEffect } from 'react'
import { Eye, Heart } from 'lucide-react'

interface BlogStatsProps {
  slug: string
  initialViews?: number
  initialLikes?: number
}

export default function BlogStats({ slug, initialViews = 0, initialLikes = 0 }: BlogStatsProps) {
  const [views, setViews] = useState(initialViews)
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [viewTracked, setViewTracked] = useState(false)

  // Track view on mount (only once per session)
  useEffect(() => {
    if (!viewTracked) {
      // Check if view was already tracked in this session
      const viewKey = `blog_view_${slug}`
      const hasViewed = typeof window !== 'undefined' && localStorage.getItem(viewKey)
      
      if (hasViewed) {
        // View already tracked in this session, just fetch current stats
        const fetchStats = async () => {
          try {
            const response = await fetch(`/api/blog/${slug}/views`, {
              method: 'GET',
            })
            
            if (response.ok) {
              const data = await response.json()
              setViews(data.views)
              setLikes(data.likes)
            }
          } catch (error) {
            console.error('Error fetching stats:', error)
          }
        }
        
        fetchStats()
        setViewTracked(true)
        return
      }
      
      // Track view
      const trackView = async () => {
        try {
          const response = await fetch(`/api/blog/${slug}/views`, {
            method: 'POST',
          })
          
          if (response.ok) {
            const data = await response.json()
            setViews(data.views)
            setLikes(data.likes)
            setViewTracked(true)
            
            // Mark as viewed in localStorage (expires after 24 hours)
            if (typeof window !== 'undefined') {
              localStorage.setItem(viewKey, Date.now().toString())
            }
          }
        } catch (error) {
          console.error('Error tracking view:', error)
        }
      }
      
      trackView()
    }
  }, [slug, viewTracked])

  // Check if user has already liked on mount
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}/like`, {
          method: 'GET',
        })
        
        if (response.ok) {
          const data = await response.json()
          setLiked(data.liked)
        }
      } catch (error) {
        console.error('Error checking like status:', error)
      }
    }
    
    checkLikeStatus()
  }, [slug])

  const handleLike = async () => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/blog/${slug}/like`, {
        method: 'POST',
      })
      
      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
        setLiked(data.liked)
      } else {
        console.error('Error toggling like')
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-6">
      {/* Views */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Eye className="w-5 h-5" />
        <span className="font-semibold text-gray-900 dark:text-white">{views.toLocaleString()}</span>
        <span className="text-sm">views</span>
      </div>

      {/* Likes */}
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 transition-all duration-200 ${
          liked
            ? 'text-red-600 dark:text-red-400'
            : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-label={liked ? 'Unlike this article' : 'Like this article'}
      >
        <Heart
          className={`w-5 h-5 transition-all duration-200 ${
            liked ? 'fill-current' : ''
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
        <span className={`font-semibold ${liked ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
          {likes.toLocaleString()}
        </span>
        <span className="text-sm">likes</span>
      </button>
    </div>
  )
}

