import { Eye, Heart } from 'lucide-react'

interface BlogStatsDisplayProps {
  views: number
  likes: number
  compact?: boolean
}

export default function BlogStatsDisplay({ views, likes, compact = false }: BlogStatsDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          <span>{views.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="w-3.5 h-3.5" />
          <span>{likes.toLocaleString()}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Eye className="w-4 h-4" />
        <span className="font-medium">{views.toLocaleString()}</span>
        <span className="text-sm">views</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Heart className="w-4 h-4" />
        <span className="font-medium">{likes.toLocaleString()}</span>
        <span className="text-sm">likes</span>
      </div>
    </div>
  )
}

