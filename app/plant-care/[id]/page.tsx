"use client"
import { use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Droplet,
  Sun,
  Leaf,
  Thermometer,
  Zap,
  Ruler,
  Clock,
  Bug,
  ShoppingBag,
  AlertCircle,
  Phone,
} from "lucide-react"
import { seedlings } from "@/lib/seedlings-data"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const categoryColors: Record<string, { bgColor: string; image: string }> = {
  mango: {
    bgColor: "from-blue-900 to-blue-950",
    image: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  citrus: {
    bgColor: "from-purple-800 to-purple-900",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80"
  },
  avocado: {
    bgColor: "from-teal-800 to-teal-900",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
  },
  berries: {
    bgColor: "from-red-900 to-purple-900",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&auto=format&fit=crop"
  },
  tropical: {
    bgColor: "from-orange-800 to-pink-800",
    image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&auto=format&fit=crop"
  }
}

export default function PlantCarePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const seedling = seedlings.find((s) => s.id === id)

  if (!seedling) {
    return (
      <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Seedling Not Found</h1>
          <Link href="/#seedlings" className="text-green-400 hover:text-green-300">
            Back to Seedlings
          </Link>
        </div>
      </div>
    )
  }

  const care = seedling.careGuide
  const categoryColor = categoryColors[seedling.category] || categoryColors.mango

  const careItems = [
    {
      key: "watering",
      label: "Watering",
      icon: Droplet,
      iconBg: "bg-blue-600/20",
      iconColor: "text-blue-400",
      content: care?.watering,
    },
    {
      key: "sunlight",
      label: "Sunlight",
      icon: Sun,
      iconBg: "bg-yellow-600/20",
      iconColor: "text-yellow-400",
      content: care?.sunlight,
    },
    {
      key: "soil",
      label: "Soil Requirements",
      icon: Leaf,
      iconBg: "bg-green-600/20",
      iconColor: "text-green-400",
      content: care?.soil,
    },
    {
      key: "temperature",
      label: "Temperature",
      icon: Thermometer,
      iconBg: "bg-red-600/20",
      iconColor: "text-red-400",
      content: care?.temperature,
    },
    {
      key: "fertilizer",
      label: "Fertilizer",
      icon: Zap,
      iconBg: "bg-purple-600/20",
      iconColor: "text-purple-400",
      content: care?.fertilizer,
    },
    {
      key: "spacing",
      label: "Spacing",
      icon: Ruler,
      iconBg: "bg-indigo-600/20",
      iconColor: "text-indigo-400",
      content: care?.spacing,
    },
    {
      key: "timeToFruit",
      label: "Time to Fruit",
      icon: Clock,
      iconBg: "bg-orange-600/20",
      iconColor: "text-orange-400",
      content: care?.timeToFruit,
    },
    {
      key: "pests",
      label: "Pest & Disease Management",
      icon: Bug,
      iconBg: "bg-rose-600/20",
      iconColor: "text-rose-400",
      content: care?.pests,
    },
  ]

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryColor.bgColor} opacity-30`}
          style={{
            backgroundImage: `url(${categoryColor.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/seedlings/${seedling.category}`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)}</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Icon */}
            <div className="flex justify-center md:justify-start">
              <div className="text-9xl drop-shadow-lg">{seedling.icon}</div>
            </div>

            {/* Content */}
            <div className="md:col-span-2 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">{seedling.name}</h1>
              <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Complete care guide for premium {seedling.category} seedling. Follow these instructions for optimal
                growth and maximum yield.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-xl font-bold text-white capitalize">{seedling.category}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-xl font-bold text-green-400">KES {seedling.price.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-gray-400 text-sm">Time to Fruit</p>
                  <p className="text-xl font-bold text-white">
                    {care?.timeToFruit ? care.timeToFruit.split(' ').slice(0, 2).join(' ') : '2-3 years'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        {care && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Complete Care Guide Section */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 text-center md:text-left">
                Complete <span className="text-green-400">Care Guide</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-12 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
                Detailed care instructions for growing your {seedling.name} seedling successfully
              </p>

              {/* Care Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.key}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${item.iconBg} flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                          <p className="text-gray-300 leading-relaxed text-sm">{item.content}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-12 md:mb-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center md:text-left">
                Growing <span className="text-green-400">Timeline</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 1</p>
                  <h3 className="text-lg font-bold text-white mb-2">Planting</h3>
                  <p className="text-gray-300 text-sm">Prepare soil, plant seedling, water thoroughly</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 2</p>
                  <h3 className="text-lg font-bold text-white mb-2">Establishment</h3>
                  <p className="text-gray-300 text-sm">Regular watering, fertilizer application</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 3</p>
                  <h3 className="text-lg font-bold text-white mb-2">Growth</h3>
                  <p className="text-gray-300 text-sm">Pruning, maintenance, pest management</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 4</p>
                  <h3 className="text-lg font-bold text-white mb-2">Fruiting</h3>
                  <p className="text-gray-300 text-sm">Harvest and ongoing maintenance</p>
                </div>
              </div>
            </div>

            {/* Common Issues Section */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center md:text-left">
                Common <span className="text-green-400">Issues & Solutions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Yellow Leaves</h3>
                      <p className="text-gray-300 text-sm">
                        Often indicates nutrient deficiency or overwatering. Check soil moisture and apply balanced
                        fertilizer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Pest Infestation</h3>
                      <p className="text-gray-300 text-sm">
                        Use neem oil spray and maintain good sanitation. Remove affected leaves and isolate if necessary.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Slow Growth</h3>
                      <p className="text-gray-300 text-sm">
                        Ensure adequate sunlight (6+ hours daily) and apply growth-promoting fertilizer monthly.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">No Fruiting</h3>
                      <p className="text-gray-300 text-sm">
                        Wait for plant maturity, adjust temperature if needed, and apply potassium-rich fertilizer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference Box */}
            <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-2xl p-8 sm:p-12 border-2 border-green-500/40 mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center md:text-left">Quick Reference</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Min Temperature</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">10°C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Ideal Sunlight</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">6+ hrs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Water Frequency</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">Regular</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Soil pH</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">6.0-7.0</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-600/10 to-green-700/10 border-t border-green-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Ready to start growing?</h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Order this premium {seedling.name} seedling today and begin your agricultural success story
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/seedlings/${seedling.category}`}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition font-semibold text-base whitespace-nowrap border border-white/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                View All Varieties
              </Link>
              <a
                href={`https://wa.me/254713764658?text=${encodeURIComponent(`Hi, I'm interested in ${seedling.name}. Please provide more information.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-bold text-base whitespace-nowrap shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
