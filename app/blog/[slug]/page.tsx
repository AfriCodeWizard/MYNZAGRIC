import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag, User, Share2, Facebook, Twitter, Linkedin, BookOpen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getAllPosts, getAllPostSlugs } from '@/lib/blog-loader'
import { BlogPost } from '@/lib/blog-data'
import Footer from '@/components/footer'
import { BlogStatsProvider } from '@/components/blog/blog-stats-provider'
import BlogStats from '@/components/blog/blog-stats'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  // Use static client for static generation
  const post = await getPostBySlug(slug, true)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    keywords: post.seo.keywords?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ShareButtons({ post }: { post: BlogPost }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mynzagric.com'
  const url = `${baseUrl}/blog/${post.slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(post.title)
  const encodedDescription = encodeURIComponent(post.excerpt)

  return (
    <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-wide">
        <Share2 className="w-4 h-4 text-green-600 dark:text-green-400" />
        Share this article
      </h3>
      <div className="flex gap-3">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-110 shadow-md hover:shadow-lg"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-all hover:scale-110 shadow-md hover:shadow-lg"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-all hover:scale-110 shadow-md hover:shadow-lg"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}

function RelatedPosts({ currentPost, allPosts }: { currentPost: BlogPost; allPosts: BlogPost[] }) {
  const related = allPosts
    .filter((post) => post.id !== currentPost.id && !post.draft)
    .filter((post) => {
      const sameCategory = post.category === currentPost.category
      const sharedTags = post.tags.some((tag) => currentPost.tags.includes(tag))
      return sameCategory || sharedTags
    })
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-20 pt-16 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-1.5 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Related Articles</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-green-400 dark:hover:border-green-600 transition-all hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1"
          >
            {post.featuredImage && (
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">{post.readingTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Force dynamic rendering to fetch fresh articles on each request
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  // Use regular client (not static) to fetch fresh data
  const post = await getPostBySlug(slug, true, false)

  if (!post || post.draft) {
    notFound()
  }

  const allPosts = await getAllPosts(false)

  return (
    <BlogStatsProvider slug={post.slug}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Image */}
      {post.featuredImage && (
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-white/90">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/90">
                  <BlogStats variant="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <article className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mb-10 transition-colors font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header - Only show if no hero image */}
          {!post.featuredImage && (
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mb-8">
                <BlogStats />
              </div>
            </header>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Author Info */}
              <div className="flex flex-col gap-4 pb-8 mb-8 border-b-2 border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-green-200 dark:border-green-800"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">{post.author.name}</div>
                    {post.author.bio && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{post.author.bio}</div>
                    )}
                  </div>
                </div>
                {post.featuredImage && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <BlogStats />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white 
                prose-headings:mt-12 prose-headings:mb-6 prose-headings:leading-tight
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-green-600 dark:prose-a:text-green-400 prose-a:no-underline 
                hover:prose-a:underline prose-a:font-semibold
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                prose-code:text-green-600 dark:prose-code:text-green-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 dark:prose-blockquote:bg-green-950/30 
                prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                prose-li:my-2 prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-12">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-16 pt-10 border-t-2 border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 uppercase tracking-wide">
                    <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold border border-green-200/50 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Posts */}
              <RelatedPosts currentPost={post} allPosts={allPosts} />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <ShareButtons post={post} />
                
                {/* Views and Likes Stats */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Engagement</h3>
                  <BlogStats compact />
                </div>
                
                {/* Reading Stats */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Reading Time</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{post.readingTime}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">minutes</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 py-20 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-green-50 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
            Get expert advice and premium seedlings for your agricultural success.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all shadow-2xl hover:shadow-green-500/20 hover:scale-105 text-lg"
          >
            Contact Us Today
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </section>
      <Footer />
      </div>
    </BlogStatsProvider>
  )
}
