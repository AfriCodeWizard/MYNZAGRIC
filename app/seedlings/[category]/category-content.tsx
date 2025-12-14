"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { ProductSchema } from "@/components/structured-data"
import { categories } from "./metadata"

interface SeedlingsCategoryContentProps {
  category: string
  categoryData: (typeof categories)[string]
  seedlings: Array<any>
}

export default function SeedlingsCategoryContent({
  category,
  categoryData,
  seedlings
}: SeedlingsCategoryContentProps) {
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      {seedlings.map((seedling) => (
        <ProductSchema key={seedling.id} seedling={seedling} />
      ))}

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

