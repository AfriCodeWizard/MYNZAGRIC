"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"
import ProductCard from "@/components/product-card"
import { seedlings } from "@/lib/seedlings-data"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"

const categories: Record<string, {
  label: string
  icon: string
  description: string
  bgImage: string
  bgColor: string
}> = {
  mango: {
    label: "Mangoes",
    icon: "🥭",
    description: "Choose from 5 premium grafted varieties including Tommy, Apple, Van Dyke, Ngowe, and Alphonso mangoes. Fast-growing, high-yield trees that start fruiting in 2-3 years. Perfect for commercial farming or home gardens.",
    bgImage: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800",
    bgColor: "from-blue-900 to-blue-950"
  },
  citrus: {
    label: "Citrus",
    icon: "🍊",
    description: "Explore 12 diverse citrus varieties from sweet Pixies and Valencia oranges to tangy Kumquats and Tangerines. Disease-resistant, grafted seedlings ready for your orchard. Fresh, vitamin-rich fruits year after year.",
    bgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
    bgColor: "from-purple-800 to-purple-900"
  },
  avocado: {
    label: "Avocados",
    icon: "🥑",
    description: "Premium Hass and Fuerte avocado varieties. High-value crop with excellent market demand. Start harvesting delicious, nutrient-rich avocados in 2-3 years. Perfect for export and local markets.",
    bgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
    bgColor: "from-teal-800 to-teal-900"
  },
  berries: {
    label: "Berries",
    icon: "🫐",
    description: "Sweet success with 3 premium berry varieties. High antioxidant content, perfect for health-conscious markets. Fast-growing plants ideal for small-scale and commercial farming. Fresh berries at your fingertips.",
    bgImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&auto=format&fit=crop",
    bgColor: "from-red-900 to-purple-900"
  },
  tropical: {
    label: "Tropical",
    icon: "🍍",
    description: "Discover 33 exotic tropical fruit varieties including passion fruit, guavas, papayas, and more! Premium grafted seedlings. Transform your farm with diverse, profitable tropical fruits loved by global markets.",
    bgImage: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&auto=format&fit=crop",
    bgColor: "from-orange-800 to-pink-800"
  }
}


export default function SeedlingsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const category = categories[resolvedParams.category]
  const categorySeedlings = seedlings.filter((s) => s.category === resolvedParams.category)

  if (!category || categorySeedlings.length === 0) {
    return (
      <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <Link href="/#seedlings" className="text-green-400 hover:text-green-300">
            Back to Seedlings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <SeedlingsCategoryContent 
      category={resolvedParams.category}
      categoryData={category}
      seedlings={categorySeedlings}
    />
  )
}

function SeedlingsCategoryContent({
  category,
  categoryData,
  seedlings
}: {
  category: string
  categoryData: (typeof categories)[string]
  seedlings: Array<any>
}) {
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryData.bgColor} opacity-30`}
          style={{
            backgroundImage: `url(${categoryData.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#seedlings"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {categoryData.label} Varieties
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              {categoryData.description}
            </p>
            <p className="text-gray-400 mt-4">
              {seedlings.length} {seedlings.length === 1 ? 'variety' : 'varieties'} available
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {seedlings.map((seedling) => (
              <ProductCard key={seedling.id} seedling={seedling} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  )
}

