'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface BlogStatsContextType {
  views: number
  likes: number
  liked: boolean
  isLoading: boolean
  updateStats: (views: number, likes: number, liked: boolean) => void
  toggleLike: () => Promise<void>
  slug: string
}

const BlogStatsContext = createContext<BlogStatsContextType | undefined>(undefined)

export function useBlogStats() {
  const context = useContext(BlogStatsContext)
  if (!context) {
    throw new Error('useBlogStats must be used within BlogStatsProvider')
  }
  return context
}

interface BlogStatsProviderProps {
  slug: string
  children: React.ReactNode
}

export function BlogStatsProvider({ slug, children }: BlogStatsProviderProps) {
  const [views, setViews] = useState(0)
  const [likes, setLikes] = useState(0)
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
            
            // Mark as viewed in localStorage
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

  const updateStats = useCallback((newViews: number, newLikes: number, newLiked: boolean) => {
    setViews(newViews)
    setLikes(newLikes)
    setLiked(newLiked)
  }, [])

  const toggleLike = useCallback(async () => {
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
  }, [slug, isLoading])

  return (
    <BlogStatsContext.Provider value={{ views, likes, liked, isLoading, updateStats, toggleLike, slug }}>
      {children}
    </BlogStatsContext.Provider>
  )
}

