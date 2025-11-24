import { use } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, MapPin, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getStoryBySlug, getAllStorySlugs } from "@/lib/success-stories"
import { notFound } from "next/navigation"

export default function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const story = getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      
      {/* Back Button */}
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Impact</span>
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={story.image}
          alt={story.name}
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
              {story.type}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {story.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-400" />
                <span>{story.location}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Quote Section */}
          {story.quote && (
            <div className="bg-gradient-to-r from-green-600/10 to-green-700/10 border-l-4 border-green-500 rounded-r-lg p-8 mb-12">
              <p className="text-2xl font-semibold text-white italic">
                "{story.quote}"
              </p>
              <p className="text-green-400 mt-4 font-medium">— {story.name}</p>
            </div>
          )}

          {/* Full Description */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {story.fullDescription}
            </p>
          </div>

          {/* Challenge Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-white">The Challenge</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {story.challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-white">The Solution</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {story.solution}
            </p>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-green-600/10 to-green-700/10 border border-green-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">The Results</h2>
            </div>
            <ul className="space-y-4">
              {story.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Grid */}
          {story.stats && story.stats.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {story.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600/10 to-green-700/10 border border-green-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Success Story?
            </h3>
            <p className="text-gray-300 mb-6">
              Join {story.name} and thousands of other farmers transforming their lives
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Generate static params for all stories
export async function generateStaticParams() {
  const slugs = getAllStorySlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

