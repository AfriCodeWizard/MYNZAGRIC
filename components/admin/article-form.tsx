'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, X, AlertCircle } from 'lucide-react'
import type { Article } from '@/lib/supabase/articles'

interface ArticleFormProps {
  article?: Article
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    cover_image: article?.cover_image || '',
    published: article?.published || false,
    category: article?.category || 'Uncategorized',
    tags: article?.tags?.join(', ') || '',
    featured: article?.featured || false,
    author_name: article?.author_name || 'Mynzagric Team',
    author_avatar: article?.author_avatar || '',
    author_bio: article?.author_bio || '',
    seo_title: article?.seo_title || '',
    seo_description: article?.seo_description || '',
    seo_keywords: article?.seo_keywords?.join(', ') || '',
  })

  // Auto-generate slug from title
  useEffect(() => {
    if (!article && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, article])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `articles/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, cover_image: data.publicUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required')
      }

      if (!formData.slug.trim()) {
        throw new Error('Slug is required')
      }

      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(formData.slug)) {
        throw new Error('Slug can only contain lowercase letters, numbers, and hyphens')
      }

      if (!formData.content.trim()) {
        throw new Error('Content is required')
      }

      // CRITICAL: Cover image is required
      if (!formData.cover_image || !formData.cover_image.trim()) {
        throw new Error('Cover image is required. Please upload an image before saving.')
      }

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('You are not authorized. Please log in again.')
      }

      const articleData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content.trim(),
        cover_image: formData.cover_image.trim(),
        published: formData.published,
        excerpt: formData.excerpt?.trim() || null,
        category: formData.category?.trim() || 'Uncategorized',
        tags: formData.tags
          ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
          : [],
        featured: formData.featured,
        author_name: formData.author_name?.trim() || 'Mynzagric Team',
        author_avatar: formData.author_avatar?.trim() || null,
        author_bio: formData.author_bio?.trim() || null,
        seo_title: formData.seo_title?.trim() || null,
        seo_description: formData.seo_description?.trim() || null,
        seo_keywords: formData.seo_keywords
          ? formData.seo_keywords.split(',').map(k => k.trim()).filter(Boolean)
          : [],
      }

      if (article) {
        // Update existing article
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id)
          .eq('author_id', user.id)

        if (error) {
          if (error.code === '23505') {
            throw new Error('An article with this slug already exists. Please use a different slug.')
          }
          if (error.code === 'PGRST116') {
            throw new Error('Article not found or you do not have permission to update it.')
          }
          throw error
        }
      } else {
        // Create new article
        const { error } = await supabase
          .from('articles')
          .insert({
            ...articleData,
            author_id: user.id,
          })

        if (error) {
          if (error.code === '23505') {
            throw new Error('An article with this slug already exists. Please use a different slug.')
          }
          throw error
        }
      }

      // Use window.location for a full page reload to ensure fresh data
      window.location.href = '/admin'
    } catch (error: any) {
      console.error('Error saving article:', error)
      let errorMessage = 'Failed to save article. Please check all required fields and try again.'
      
      if (error?.message) {
        errorMessage = error.message
      } else if (error?.code === '23505') {
        errorMessage = 'An article with this slug already exists. Please use a different slug.'
      }
      
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => {
                // Validate slug format: only lowercase letters, numbers, and hyphens
                const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                setFormData(prev => ({ ...prev, slug: value }))
                setError(null) // Clear error when user types
              }}
              required
              disabled={loading}
              title="Slug must contain only lowercase letters, numbers, and hyphens"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Only lowercase letters, numbers, and hyphens are allowed
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={15}
              required
              disabled={loading}
              className="font-mono text-sm"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Markdown is supported
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image *</Label>
            <div className="flex items-center gap-4">
              <Input
                id="cover_image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || loading}
                className="flex-1"
                required={!formData.cover_image}
              />
              {uploading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
            {formData.cover_image && (
              <div className="relative mt-2">
                <img
                  src={formData.cover_image}
                  alt="Cover preview"
                  className="h-32 w-auto rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, cover_image: '' }))
                    setError(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            {!formData.cover_image && (
              <p className="text-sm text-red-500 dark:text-red-400">
                A cover image is required to save this article
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              disabled={loading}
              placeholder="farming, irrigation, tips"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Article</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Show this article prominently on the blog page
              </p>
            </div>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="published">Published</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Make this article visible to the public
              </p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Author Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author_name">Author Name</Label>
            <Input
              id="author_name"
              value={formData.author_name}
              onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_avatar">Author Avatar URL</Label>
            <Input
              id="author_avatar"
              value={formData.author_avatar}
              onChange={(e) => setFormData(prev => ({ ...prev, author_avatar: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_bio">Author Bio</Label>
            <Textarea
              id="author_bio"
              value={formData.author_bio}
              onChange={(e) => setFormData(prev => ({ ...prev, author_bio: e.target.value }))}
              rows={3}
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seo_title">SEO Title</Label>
            <Input
              id="seo_title"
              value={formData.seo_title}
              onChange={(e) => setFormData(prev => ({ ...prev, seo_title: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_description">SEO Description</Label>
            <Textarea
              id="seo_description"
              value={formData.seo_description}
              onChange={(e) => setFormData(prev => ({ ...prev, seo_description: e.target.value }))}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_keywords">SEO Keywords (comma-separated)</Label>
            <Input
              id="seo_keywords"
              value={formData.seo_keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, seo_keywords: e.target.value }))}
              disabled={loading}
              placeholder="farming, agriculture, tips"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin')}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading || uploading || !formData.cover_image}
          title={!formData.cover_image ? 'Please upload a cover image first' : ''}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : article ? (
            'Update Article'
          ) : (
            'Create Article'
          )}
        </Button>
      </div>
    </form>
  )
}

