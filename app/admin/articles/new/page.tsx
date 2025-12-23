import { ArticleForm } from '@/components/admin/article-form'

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Article</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Create a new blog article
        </p>
      </div>
      
      <ArticleForm />
    </div>
  )
}

