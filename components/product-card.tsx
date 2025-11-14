"use client"

import { useState } from "react"
import { Leaf, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

interface Seedling {
  id: string
  name: string
  price: number
  icon: string
  category: string
  careGuide?: {
    watering: string
    sunlight: string
    soil: string
    temperature: string
    fertilizer: string
    spacing: string
    timeToFruit: string
    pests: string
  }
}

export default function ProductCard({
  seedling,
  onAddToCart,
}: { seedling: Seedling; onAddToCart: (seedling: Seedling) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(seedling)
    setShowAddedFeedback(true)
    setTimeout(() => setShowAddedFeedback(false), 2000)
  }

  return (
    <div
      className="group bg-white rounded-lg overflow-hidden border border-green-100 hover:border-green-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with overlay */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center overflow-hidden">
        <div className="text-7xl group-hover:scale-110 transition-transform duration-300">{seedling.icon}</div>

        {isHovered && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-100 transition">
            <button
              onClick={handleAddToCart}
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition transform hover:scale-110 shadow-lg relative"
              title="Add to Bulk Order"
            >
              <Plus className="w-6 h-6" />
              {showAddedFeedback && (
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap">
                  Added to cart!
                </div>
              )}
            </button>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          KES {seedling.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-sm leading-snug group-hover:text-green-700 transition">
          {seedling.name}
        </h3>

        {/* Category Badge */}
        <div className="inline-flex items-center gap-1 w-fit mb-3">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
            {seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-green-100">
          <Link
            href={`/plant-care/${seedling.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition text-sm"
          >
            <Leaf className="w-4 h-4" />
            View Plant Care Guide
          </Link>
        </div>
      </div>
    </div>
  )
}
