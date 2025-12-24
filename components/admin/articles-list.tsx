'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Article } from '@/lib/supabase/articles'

interface ArticlesListProps {
  articles: Article[]
}

export function ArticlesList({ articles: initialArticles }: ArticlesListProps) {
  const router = useRouter()
  const [articles, setArticles] = useState(initialArticles)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null)
  const [loading, setLoading] = useState(false)

  // Sync articles when initialArticles prop changes (e.g., after page refresh)
  useEffect(() => {
    setArticles(initialArticles)
  }, [initialArticles])

  const handleDelete = async () => {
    if (!articleToDelete) return

    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleToDelete.id)

      if (error) throw error

      setArticles(articles.filter(a => a.id !== articleToDelete.id))
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
      router.refresh()
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Failed to delete article')
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePublish = async (article: Article) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('articles')
        .update({ published: !article.published })
        .eq('id', article.id)

      if (error) throw error

      setArticles(articles.map(a => 
        a.id === article.id ? { ...a, published: !a.published } : a
      ))
      router.refresh()
    } catch (error) {
      console.error('Error toggling publish status:', error)
      alert('Failed to update article')
    }
  }

  const openDeleteDialog = (article: Article) => {
    setArticleToDelete(article)
    setDeleteDialogOpen(true)
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No articles yet. Create your first article to get started.
          </p>
          <Link href="/admin/articles/new">
            <Button>Create Article</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <Badge variant={article.published ? 'default' : 'secondary'}>
                      {article.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <CardDescription>
                    {article.excerpt || 'No excerpt'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Slug: {article.slug}</span>
                  <span>•</span>
                  <span>
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTogglePublish(article)}
                  >
                    {article.published ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Publish
                      </>
                    )}
                  </Button>
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteDialog(article)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article
              &quot;{articleToDelete?.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

