import { BlogPost } from './blog-data'
import { getAllArticles, getArticleBySlug, articleToBlogPost } from './supabase/articles'

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    // Use static client for build-time generation (generateStaticParams)
    const articles = await getAllArticles(true, true)
    return articles.map(article => article.slug)
  } catch (error) {
    console.error('Error loading post slugs:', error)
    return []
  }
}

export async function getPostBySlug(slug: string, useStaticClient: boolean = false): Promise<BlogPost | null> {
  try {
    const article = await getArticleBySlug(slug, true, useStaticClient)
    if (!article) {
      return null
    }
    return articleToBlogPost(article)
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(useStaticClient: boolean = false): Promise<BlogPost[]> {
  try {
    const articles = await getAllArticles(true, useStaticClient)
    return articles.map(article => articleToBlogPost(article))
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

