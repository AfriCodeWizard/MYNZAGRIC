import { MetadataRoute } from 'next'
import { seedlings } from '@/lib/seedlings-data'
import { getAllStorySlugs } from '@/lib/success-stories'
import { getAllPostSlugs } from '@/lib/blog-loader'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mynzagric.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/flowers-landscapes`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Category pages
  const categories = ['mango', 'citrus', 'avocado', 'berries', 'tropical']
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/seedlings/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Plant care pages
  const plantCarePages = seedlings.map((seedling) => ({
    url: `${baseUrl}/plant-care/${seedling.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Frutopia value pack pages
  const valuePackPages = [
    {
      url: `${baseUrl}/frutopia/mango`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/frutopia/avocado`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/frutopia/pixie-orange`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/frutopia/citrus`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Success story pages
  const storySlugs = getAllStorySlugs()
  const storyPages = storySlugs.map((slug) => ({
    url: `${baseUrl}/impact/stories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog pages
  const blogSlugs = getAllPostSlugs()
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...plantCarePages,
    ...valuePackPages,
    ...storyPages,
    ...blogPages,
  ]
}


