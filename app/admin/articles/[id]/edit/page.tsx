import { getArticleById } from '@/lib/supabase/articles'
import { ArticleForm } from '@/components/admin/article-form'
import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase/auth'

// Force dynamic rendering to fetch fresh article data
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Ensure this route is not statically generated
export async function generateStaticParams() {
  return []
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // Ensure user is authenticated
  const user = await getCurrentUser()
  if (!user) {
    notFound()
  }
  
  // Fetch the article
  const article = await getArticleById(id)

  // Check if article exists and belongs to the current user
  if (!article || article.author_id !== user.id) {
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

