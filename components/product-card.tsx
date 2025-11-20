"use client"

import { useState } from "react"
import { Leaf, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
  const [isExpanded, setIsExpanded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(seedling)
    setIsExpanded(true)
    setTimeout(() => setIsExpanded(false), 1600)
  }

  const categoryLabel = seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)

  return (
    <div className={cn(
      "relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col",
      "hover:shadow-2xl border border-gray-200",
      isExpanded && "shadow-2xl"
    )} data-product-card="new-design">
      {/* Icon/Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center overflow-hidden">
        <div className="text-8xl transform transition-transform duration-300 hover:scale-110">
          {seedling.icon}
        </div>
      </div>

      {/* Content Section with diagonal overlay */}
      <div className="relative z-10 bg-white pt-8 pb-4 px-6 flex-grow flex flex-col">
        {/* Diagonal background accent */}
        <div className="absolute top-0 left-0 w-[200%] h-24 bg-white transform -rotate-[8deg] -translate-y-12 -translate-x-[10%] -z-10" />

        {/* Buy Button - Floating */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute top-0 right-6 -translate-y-1/2 z-20 w-[70px] h-[70px] rounded-full",
            "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            "text-white shadow-xl transition-all duration-300 flex items-center justify-center",
            "hover:scale-110 active:scale-95",
            isExpanded && "w-[750px] h-[750px] -right-[375px] -top-[375px] pointer-events-none"
          )}
          title="Add to Cart"
          disabled={isExpanded}
        >
          <ShoppingCart className={cn(
            "w-8 h-8 transition-opacity duration-300",
            isExpanded && "opacity-0"
          )} />
        </button>

        {/* Success Checkmark Overlay */}
        <div className={cn(
          "absolute top-1/2 left-[37%] -translate-x-1/2 -translate-y-1/2 z-[999] opacity-0 transition-opacity duration-300 pointer-events-none",
          isExpanded && "opacity-100 delay-[600ms]"
        )}>
          <div className="relative w-16 h-16">
            {/* Checkmark lines - using borders */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* First line (shorter, rotated 45deg) */}
              <div className="absolute w-10 h-[4px] bg-white rounded-full top-[8px] left-[-20px] transform rotate-45" />
              {/* Second line (longer, rotated -45deg) */}
              <div className="absolute w-[88px] h-[4px] bg-white rounded-full top-[-16px] left-[8px] transform -rotate-45" />
            </div>
          </div>
        </div>

        {/* Product Title - Redesigned */}
        <h3 className="text-2xl font-black uppercase text-gray-900 mb-2 leading-tight mt-2">
          {seedling.name}
        </h3>

        {/* Category Description */}
        <div className="text-green-700 font-medium text-sm mb-4 italic">
          {categoryLabel} Variety
        </div>

        {/* Price with decorative lines */}
        <div className="relative flex items-center justify-center my-6">
          <span className="absolute left-0 top-1/2 h-[1px] w-12 bg-gray-300" />
          <span className="text-3xl font-black text-green-600 px-4">
            KES {seedling.price.toLocaleString()}
          </span>
          <span className="absolute right-0 top-1/2 h-[1px] w-12 bg-gray-300" />
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-4 h-4 transition-colors",
                  star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>

          {/* Plant Care Guide Link */}
          <Link
            href={`/plant-care/${seedling.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Leaf className="w-4 h-4" />
            View Care Guide
          </Link>
        </div>
      </div>
    </div>
  )
}
