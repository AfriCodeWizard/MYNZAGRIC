'use client'

import { useBlogStats } from './blog-stats-provider'
import { Eye, Heart } from 'lucide-react'

interface BlogStatsProps {
  compact?: boolean
  variant?: 'default' | 'white'
}

export default function BlogStats({ compact = false, variant = 'default' }: BlogStatsProps) {
  const { views, likes, liked, isLoading, toggleLike } = useBlogStats()

  const textColor = variant === 'white' 
    ? 'text-white/90' 
    : 'text-gray-600 dark:text-gray-400'
  
  const textColorBold = variant === 'white'
    ? 'text-white'
    : 'text-gray-900 dark:text-white'

  if (compact) {
    return (
      <div className="flex flex-col gap-3">
        {/* Views */}
        <div className={`flex items-center gap-2 ${textColor}`}>
          <Eye className="w-4 h-4 flex-shrink-0" />
          <span className={`font-semibold ${textColorBold}`}>{views.toLocaleString()}</span>
          <span className="text-xs">views</span>
        </div>

        {/* Likes */}
        <button
          onClick={toggleLike}
          disabled={isLoading}
          className={`flex items-center gap-2 transition-all duration-200 ${
            liked
              ? 'text-red-600 dark:text-red-400'
              : `${textColor} hover:text-red-600 dark:hover:text-red-400`
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label={liked ? 'Unlike this article' : 'Like this article'}
        >
          <Heart
            className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
              liked ? 'fill-current' : ''
            } ${isLoading ? 'animate-pulse' : ''}`}
          />
          <span className={`font-semibold ${liked ? 'text-red-600 dark:text-red-400' : textColorBold}`}>
            {likes.toLocaleString()}
          </span>
          <span className="text-xs">likes</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Views */}
      <div className={`flex items-center gap-2 ${textColor}`}>
        <Eye className="w-5 h-5 flex-shrink-0" />
        <span className={`font-semibold ${textColorBold}`}>{views.toLocaleString()}</span>
        <span className="text-sm whitespace-nowrap">views</span>
      </div>

      {/* Likes */}
      <button
        onClick={toggleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 transition-all duration-200 ${
          liked
            ? 'text-red-600 dark:text-red-400'
            : `${textColor} hover:text-red-600 dark:hover:text-red-400`
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-label={liked ? 'Unlike this article' : 'Like this article'}
      >
        <Heart
          className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
            liked ? 'fill-current' : ''
          } ${isLoading ? 'animate-pulse' : ''}`}
        />
        <span className={`font-semibold ${liked ? 'text-red-600 dark:text-red-400' : textColorBold}`}>
          {likes.toLocaleString()}
        </span>
        <span className="text-sm whitespace-nowrap">likes</span>
      </button>
    </div>
  )
}

