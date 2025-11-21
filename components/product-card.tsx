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
    <div 
      className={cn(
        "relative bg-white overflow-hidden text-center rounded-lg group",
        isExpanded && "expanded"
      )}
      style={{
        boxShadow: '0px 5px 43px rgba(0, 0, 0, 0.48)',
        padding: 0,
        maxWidth: '360px',
        width: '100%',
      }}
    >
      {/* Image/Icon Container - CodePen style */}
      <div className="relative w-full overflow-hidden">
        <div className="w-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center" style={{ minHeight: '180px' }}>
        <div className="text-8xl transform transition-transform duration-300 hover:scale-110">
          {seedling.icon}
          </div>
        </div>
      </div>

      {/* Content Section - CodePen style */}
      <div 
        className="relative z-10 bg-white pt-4 pb-2 px-4 flex flex-col"
        style={{
          position: 'relative',
          minHeight: '240px',
        }}
      >
        {/* Diagonal background accent - CodePen exact measurements */}
        <div 
          className="absolute bg-white"
          style={{
            content: '',
            width: '200%',
            height: '100px',
            position: 'absolute',
            display: 'block',
            backgroundColor: '#fff',
            transform: 'rotate(-8deg)',
            top: '-50px',
            left: '-10%',
            zIndex: -1,
          }}
        />

        {/* Buy Button - CodePen exact measurements with cart-plus icon */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute rounded-full text-white transition-all duration-300",
            "flex items-center justify-center hover:scale-110 active:scale-95",
            "hover:bg-green-600",
            "group-hover:animate-pulse group-hover:scale-110 group-hover:shadow-2xl",
            "group-hover:shadow-green-500/50",
            isExpanded && "pointer-events-none"
          )}
          style={{
            display: 'block',
            top: '-80px',
            right: '30px',
            zIndex: 2,
            width: '70px',
            height: '70px',
            backgroundColor: '#10b981', // green-500 for website theme
            fontSize: '36px',
            color: '#fff',
            transition: 'all 0.3s ease',
            borderRadius: '50%',
            position: 'absolute',
            ...(isExpanded && {
              width: '750px',
              height: '750px',
              right: '-375px',
              top: '-375px',
            }),
          }}
          title="Add to Cart"
          disabled={isExpanded}
        >
          {/* Animated glow ring on card hover */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <div className="relative flex items-center justify-center" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <ShoppingCart 
              className={cn(
                "transition-all duration-300 group-hover:rotate-12",
            isExpanded && "opacity-0"
              )}
              style={{
                width: '30px',
                height: '30px',
                strokeWidth: 2.5,
              }}
            />
          </div>
        </button>

        {/* Success Checkmark Overlay - CodePen exact measurements */}
        <div 
          className={cn(
            "absolute pointer-events-none transition-opacity duration-300",
          isExpanded && "opacity-100 delay-[600ms]"
          )}
          style={{
            position: 'absolute',
            top: '50%',
            left: '37%',
            transform: 'translate(-50%, -50%)',
            opacity: isExpanded ? 1 : 0,
            zIndex: 999,
            ...(isExpanded && {
              transition: 'opacity 0.3s 0.6s',
            }),
          }}
        >
          <div className="relative" style={{ width: '88px', height: '40px', position: 'relative' }}>
            {/* Checkmark - First line (CodePen exact: 40px width, 20px height, rotate 45deg) */}
            <div 
              className="absolute bg-white"
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '40px',
                height: '20px',
                transform: 'rotate(45deg)',
                top: '10px',
                left: '0px',
              }}
            />
            {/* Checkmark - Second line (CodePen exact: 88px width, 20px height, rotate -45deg) */}
            <div 
              className="absolute bg-white"
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                backgroundColor: '#fff',
                width: '88px',
                height: '20px',
                transform: 'rotate(-45deg)',
                top: '-6px',
                left: '8px',
              }}
            />
          </div>
        </div>

        {/* Product Title - CodePen exact measurements, slightly reduced */}
        <h3 
          className="font-black uppercase mb-1"
          style={{
            fontSize: '1.8em',
            fontWeight: 900,
            textTransform: 'uppercase',
            margin: 0,
            fontFamily: 'var(--font-acme), sans-serif',
            color: '#1f2937',
          }}
        >
          {seedling.name}
        </h3>

        {/* Category Description - CodePen exact measurements, slightly reduced */}
        <div 
          className="mb-2 italic"
          style={{
            fontFamily: 'var(--font-satisfy), cursive',
            fontSize: '1.1em',
            color: '#059669', // green-600 for website theme
          }}
        >
          {categoryLabel} Variety
        </div>

        {/* Price with decorative lines - CodePen exact measurements, slightly reduced */}
        <div 
          className="relative inline-block font-black"
          style={{
            fontSize: '1.8em',
            fontWeight: 900,
            display: 'block',
            width: '100px',
            margin: '10px auto 0',
            position: 'relative',
            fontFamily: 'var(--font-satisfy), cursive',
            color: '#059669', // green-600 for website theme
          }}
        >
          <span 
            className="absolute"
            style={{
              content: '',
              height: '1px',
              width: '50px',
              display: 'block',
              position: 'absolute',
              backgroundColor: '#ddd',
              top: '18px',
              left: '-50px',
            }}
          />
          <span>
            KES {seedling.price.toLocaleString()}
          </span>
          <span 
            className="absolute"
            style={{
              content: '',
              height: '1px',
              width: '50px',
              display: 'block',
              position: 'absolute',
              backgroundColor: '#ddd',
              top: '18px',
              right: '-50px',
            }}
          />
        </div>

        {/* Footer Section - CodePen exact measurements, reduced - pushed to bottom */}
        <div className="mt-auto">
          {/* Star Rating - CodePen style */}
          <ul 
            className="flex items-center justify-center gap-1 list-none p-0 m-0"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0.6em 0',
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <li key={star} style={{ color: '#EFD829' }}>
              <Star
                className={cn(
                  "w-4 h-4 transition-colors",
                    star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300 fill-none"
                )}
              />
              </li>
            ))}
          </ul>

          {/* Plant Care Guide Link - Maintained from original, consistent height */}
          <Link
            href={`/plant-care/${seedling.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] mt-2"
            style={{
              height: '36px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Leaf className="w-4 h-4" />
            View Care Guide
          </Link>
        </div>
      </div>
    </div>
  )
}



