import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, User, Sparkles } from 'lucide-react'
import { getAllPosts } from '@/lib/blog-loader'
import { BlogPost } from '@/lib/blog-data'
import Footer from '@/components/footer'

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
        className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/30 hover:border-green-400 dark:hover:border-green-600 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5" />
              Featured
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-green-100">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-green-300 transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="text-green-50 text-base md:text-lg mb-5 line-clamp-2 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <User className="w-4 h-4 text-green-200" />
              </div>
              <span className="text-sm font-medium text-green-100">{post.author.name}</span>
            </div>
            <span className="flex items-center gap-2 text-green-200 font-semibold group-hover:text-white group-hover:gap-3 transition-all">
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
      className="group block h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden">
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
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-green-600 dark:text-green-400 text-xs font-bold rounded-full shadow-md border border-green-200/50">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} min
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <User className="w-3 h-3 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{post.author.name}</span>
          </div>
          <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
            Read
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-lg border border-green-200/50 dark:border-green-800/50"
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

// Force dynamic rendering to fetch fresh articles on each request
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  // Use regular client (not static) to fetch fresh data on each request
  const allPosts = await getAllPosts(false)
  const publishedPosts = allPosts.filter((post) => !post.draft)
  const featuredPosts = publishedPosts.filter((post) => post.featured)
  const regularPosts = publishedPosts.filter((post) => !post.featured)

  // Get unique categories
  const categories = Array.from(new Set(publishedPosts.map((post) => post.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-green-600 via-emerald-600 to-green-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/30">
              <Sparkles className="w-4 h-4" />
              Expert Agricultural Insights
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Mynzagric Blog
            </h1>
            <p className="text-xl md:text-2xl text-green-50 mb-10 leading-relaxed max-w-2xl mx-auto">
              Expert farming advice, irrigation guides, and agricultural insights to help you grow better crops and build a thriving farm.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.slice(0, 6).map((category) => (
                <span
                  key={category}
                  className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30 hover:bg-white/30 transition-all hover:scale-105"
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
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-1.5 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-1.5 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">All Articles</h2>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              ({publishedPosts.length} {publishedPosts.length === 1 ? 'article' : 'articles'})
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
          </div>
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <Tag className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Have Questions About Farming?</h2>
          <p className="text-green-50 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
            Get expert advice and personalized solutions for your agricultural needs.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all shadow-2xl hover:shadow-green-500/20 hover:scale-105 text-lg"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
