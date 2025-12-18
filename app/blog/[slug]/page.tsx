import { use } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog-data"
import { getAllPosts } from "@/lib/blog-loader"
import { BreadcrumbSchema } from "@/components/structured-data"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const seoTitle = post.seo?.title || post.title
  const seoDescription = post.seo?.description || post.excerpt

  return {
    title: `${seoTitle} | Mynzagric Blog`,
    description: seoDescription,
    keywords: post.seo?.keywords || post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: [post.featuredImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug && !p.draft)
    .slice(0, 3)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mynzagric.com'
  const shareUrl = `${baseUrl}/blog/${slug}`
  const shareTitle = encodeURIComponent(post.title)

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${slug}` }
      ]} />
      <div className="min-h-screen bg-[#07090d]">
        <Navbar />
        
        {/* Back Button */}
        <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </Link>
          </div>
        </div>

        {/* Hero Image Section */}
        <section className="relative h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden mb-12">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/80 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {post.category}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-3">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-invert prose-lg max-w-none mb-12">
              <div className="blog-content text-gray-300 leading-relaxed" style={{
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
              }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-invert prose-lg max-w-none"
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-white mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 text-gray-300 leading-relaxed" {...props} />,
                    a: ({node, ...props}) => <a className="text-green-400 hover:text-green-300 underline" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-green-500 pl-6 py-4 my-6 bg-white/5 italic text-gray-200" {...props} />
                    ),
                    code: ({node, ...props}) => (
                      <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-green-400" {...props} />
                    ),
                    pre: ({node, ...props}) => (
                      <pre className="bg-white/10 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
                    ),
                    img: ({node, ...props}) => (
                      <img className="rounded-lg my-8 w-full" {...props} />
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-12 pb-8 border-b border-white/10">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-400/50 rounded-full text-sm text-gray-300 hover:text-green-400 transition-all"
                    >
                      <Tag className="w-4 h-4" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mb-12 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-medium">Share:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-400/50 rounded-lg text-gray-300 hover:text-green-400 transition-all"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-400/50 rounded-lg text-gray-300 hover:text-green-400 transition-all"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-400/50 rounded-lg text-gray-300 hover:text-green-400 transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            {post.author.bio && (
              <div className="mb-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="rounded-full flex-shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{post.author.name}</h3>
                    <p className="text-gray-300 leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-green-400/50 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                          <span>Read More</span>
                          <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

