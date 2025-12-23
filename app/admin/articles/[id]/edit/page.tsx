import { getArticleById } from '@/lib/supabase/articles'
import { ArticleForm } from '@/components/admin/article-form'
import { notFound } from 'next/navigation'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Update your blog article
        </p>
      </div>
      
      <ArticleForm article={article} />
    </div>
  )
}

