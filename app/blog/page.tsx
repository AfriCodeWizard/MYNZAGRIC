import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"
import { getFeaturedPosts, getAllCategories, getAllTags } from "@/lib/blog-data"
import { getAllPosts } from "@/lib/blog-loader"
import { BreadcrumbSchema } from "@/components/structured-data"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Blog - Expert Farming Tips & Agricultural Insights | Mynzagric",
  description: "Discover expert farming tips, agricultural insights, and success stories. Learn about fruit farming, irrigation systems, and modern agricultural practices.",
  keywords: ["farming blog", "agricultural tips", "fruit farming", "irrigation systems", "farming advice", "agricultural insights"],
  openGraph: {
    title: "Blog - Expert Farming Tips & Agricultural Insights | Mynzagric",
    description: "Discover expert farming tips, agricultural insights, and success stories.",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  const allPosts = getAllPosts().filter(post => !post.draft).sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const featuredPosts = allPosts.filter(post => post.featured)
  const regularPosts = allPosts.filter(post => !post.featured)
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" }
      ]} />
      <div className="min-h-screen bg-[#07090d]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
                Our <span className="text-green-400">Blog</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Expert insights, farming tips, and agricultural knowledge to help you succeed
              </p>
            </div>

            {/* Featured Article */}
            {featuredPosts.length > 0 && (
              <div className="mb-20">
                <div className="inline-block bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Featured Article
                </div>
                <Link 
                  href={`/blog/${featuredPosts[0].slug}`}
                  className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-400/50 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-[400px] md:h-auto overflow-hidden">
                      <Image
                        src={featuredPosts[0].featuredImage}
                        alt={featuredPosts[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="inline-block bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit">
                        {featuredPosts[0].category}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                        {featuredPosts[0].title}
                      </h2>
                      <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                        {featuredPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(featuredPosts[0].publishedAt), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPosts[0].readingTime} min read</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-400 font-semibold group-hover:gap-4 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Categories & Tags Filter */}
            {(categories.length > 0 || tags.length > 0) && (
              <div className="mb-12 flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="px-4 py-2 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-400/50 rounded-full text-sm text-gray-300 hover:text-green-400 transition-all"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-400/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-gray-500"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-green-400 text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {allPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400 mb-4">No blog posts yet.</p>
                <p className="text-gray-500">Check back soon for expert farming tips and insights!</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

