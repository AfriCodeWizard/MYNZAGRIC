'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
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
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Sync articles when initialArticles prop changes (e.g., after page refresh)
  useEffect(() => {
    setArticles(initialArticles)
  }, [initialArticles])

  const handleDelete = async () => {
    if (!articleToDelete) return

    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('You are not authorized. Please log in again.')
      }

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleToDelete.id)
        .eq('author_id', user.id) // Ensure user can only delete their own articles

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Article not found or you do not have permission to delete it.')
        }
        throw error
      }

      setArticles(articles.filter(a => a.id !== articleToDelete.id))
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
      setSuccess(`Article "${articleToDelete.title}" has been deleted successfully.`)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
      
      // Refresh the page to ensure data is in sync
      window.location.href = '/admin'
    } catch (error: any) {
      console.error('Error deleting article:', error)
      const errorMessage = error?.message || 'Failed to delete article. Please try again.'
      setError(errorMessage)
      setLoading(false)
    }
  }

  const handleTogglePublish = async (article: Article) => {
    setError(null)
    setSuccess(null)
    
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('You are not authorized. Please log in again.')
      }

      const newPublishedStatus = !article.published
      const { error } = await supabase
        .from('articles')
        .update({ published: newPublishedStatus })
        .eq('id', article.id)
        .eq('author_id', user.id) // Ensure user can only update their own articles

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Article not found or you do not have permission to update it.')
        }
        throw error
      }

      setArticles(articles.map(a => 
        a.id === article.id ? { ...a, published: newPublishedStatus } : a
      ))
      
      setSuccess(`Article has been ${newPublishedStatus ? 'published' : 'unpublished'} successfully.`)
      setTimeout(() => setSuccess(null), 3000)
      
      router.refresh()
    } catch (error: any) {
      console.error('Error toggling publish status:', error)
      const errorMessage = error?.message || 'Failed to update article. Please try again.'
      setError(errorMessage)
      setTimeout(() => setError(null), 5000)
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
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950/20">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">{success}</AlertDescription>
        </Alert>
      )}
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

