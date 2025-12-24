import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllArticles } from '@/lib/supabase/articles'
import { ArticlesList } from '@/components/admin/articles-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function AdminPage() {
  // Get all articles (including unpublished)
  const articles = await getAllArticles(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your blog articles ({articles.length} {articles.length === 1 ? 'article' : 'articles'})
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>
      
      <ArticlesList articles={articles} />
    </div>
  )
}

