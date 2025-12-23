import { redirect } from 'next/navigation'
import { getAllArticles } from '@/lib/supabase/articles'
import { ArticlesList } from '@/components/admin/articles-list'

export default async function AdminPage() {
  // Get all articles (including unpublished)
  const articles = await getAllArticles(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your blog articles
          </p>
        </div>
      </div>
      
      <ArticlesList articles={articles} />
    </div>
  )
}

