import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react'
import { getAllPosts } from '@/lib/blog-loader'
import { BlogPost } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Blog - Mynzagric | Farming Tips, Irrigation Guides & Agricultural Insights',
  description: 'Expert farming advice, irrigation guides, and agricultural insights from Mynzagric. Learn about modern farming techniques, crop management, and sustainable agriculture.',
  keywords: 'farming blog, irrigation guides, agricultural tips, crop management, sustainable farming',
  openGraph: {
    title: 'Mynzagric Blog - Expert Farming & Irrigation Guides',
    description: 'Expert farming advice, irrigation guides, and agricultural insights',
    type: 'website',
  },
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/30 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10"
      >
        <div className="relative h-80 md:h-96 overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <span className="text-6xl">🌱</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
              Featured
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex items-center gap-4 mb-3 text-sm text-green-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-green-300 transition-colors">
            {post.title}
          </h2>
          <p className="text-green-50 text-lg mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-300" />
              <span className="text-sm text-green-100">{post.author.name}</span>
            </div>
            <span className="flex items-center gap-2 text-green-300 font-semibold group-hover:gap-3 transition-all">
              Read More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10"
    >
      <div className="relative h-48 overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <span className="text-4xl">🌱</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} min
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{post.author.name}</span>
          </div>
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold group-hover:gap-2 transition-all">
            Read
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const publishedPosts = allPosts.filter((post) => !post.draft)
  const featuredPosts = publishedPosts.filter((post) => post.featured)
  const regularPosts = publishedPosts.filter((post) => !post.featured)

  // Get unique categories
  const categories = Array.from(new Set(publishedPosts.map((post) => post.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Mynzagric Blog
            </h1>
            <p className="text-xl md:text-2xl text-green-50 mb-8">
              Expert farming advice, irrigation guides, and agricultural insights
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.slice(0, 5).map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Articles</h2>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              ({publishedPosts.length} {publishedPosts.length === 1 ? 'article' : 'articles'})
            </span>
          </div>
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have Questions About Farming?</h2>
          <p className="text-green-50 mb-8 text-lg">
            Get expert advice and personalized solutions for your agricultural needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

