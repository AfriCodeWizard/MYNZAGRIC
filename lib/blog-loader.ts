import { BlogPost } from './blog-data'
import { getAllArticles, getArticleBySlug, articleToBlogPost } from './supabase/articles'

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const articles = await getAllArticles(true)
    return articles.map(article => article.slug)
  } catch (error) {
    console.error('Error loading post slugs:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const article = await getArticleBySlug(slug, true)
    if (!article) {
      return null
    }
    return articleToBlogPost(article)
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const articles = await getAllArticles(true)
    return articles.map(article => articleToBlogPost(article))
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

