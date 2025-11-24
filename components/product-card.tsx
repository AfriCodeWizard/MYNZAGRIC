"use client"

import { useState, useEffect, useRef } from "react"
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
  const [isInViewport, setIsInViewport] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFlippedToGreen, setIsFlippedToGreen] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const flipInnerRef = useRef<HTMLDivElement>(null)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer for mobile viewport detection
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting)
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of card is visible
      }
    )

    observer.observe(card)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleAddToCart = () => {
    // Check if currently showing black side by checking animation state
    // The animation shows black side between 10% and 60% of the cycle
    if (flipInnerRef.current) {
      const computedStyle = window.getComputedStyle(flipInnerRef.current)
      const animationName = computedStyle.animationName
      const transform = computedStyle.transform
      
      // Check if transform indicates back side is visible (rotated between 90-270deg)
      let isShowingBlackSide = false
      
      if (transform && transform !== 'none') {
        // Check for rotateY in transform
        const rotateYMatch = transform.match(/rotateY\(([^)]+)\)/)
        if (rotateYMatch) {
          const rotation = parseFloat(rotateYMatch[1])
          // Normalize to 0-360 range
          const normalizedRotation = ((rotation % 360) + 360) % 360
          // Black side is visible when rotated between 90-270 degrees
          isShowingBlackSide = normalizedRotation >= 90 && normalizedRotation <= 270
        } else {
          // Fallback: check matrix for rotation
          const matrixMatch = transform.match(/matrix3d\(([^)]+)\)/) || transform.match(/matrix\(([^)]+)\)/)
          if (matrixMatch) {
            const values = matrixMatch[1].split(',').map(Number)
            // If first value is negative, likely rotated 180deg
            if (values.length > 0 && values[0] < -0.5) {
              isShowingBlackSide = true
            }
          }
        }
      }
      
      // If showing black side, flip back to green first
      if (isShowingBlackSide) {
        setIsFlippedToGreen(false)
        // Stop animation and flip to green
        if (flipInnerRef.current) {
          flipInnerRef.current.style.animation = 'none'
          flipInnerRef.current.style.transform = 'rotateY(0deg)'
          flipInnerRef.current.style.transition = 'transform 0.3s ease-in-out'
        }
        
        // Wait for flip to complete, then expand
        setTimeout(() => {
          setIsFlippedToGreen(true)
          onAddToCart(seedling)
          setIsExpanded(true)
          setTimeout(() => setIsExpanded(false), 1600)
        }, 350)
        return
      }
    }
    
    // If already on green side, proceed normally
    setIsFlippedToGreen(true)
    onAddToCart(seedling)
    setIsExpanded(true)
    setTimeout(() => setIsExpanded(false), 1600)
  }

  const categoryLabel = seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
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

        {/* Buy Button - Coin Flip Design */}
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute rounded-full text-white coin-flip-button",
            "active:scale-95",
            isExpanded && "pointer-events-none",
            // Trigger flip animation: on hover (web) or when in viewport (mobile)
            (isMobile && isInViewport) || (!isMobile && isHovered) ? "coin-flip-active" : ""
          )}
          style={{
            display: 'block',
            top: '-80px',
            right: '30px',
            zIndex: 2,
            width: '70px',
            height: '70px',
            fontSize: '36px',
            color: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            overflow: 'hidden',
            ...(isExpanded && {
              width: '750px',
              height: '750px',
              right: '-375px',
              top: '-375px',
            }),
          }}
          disabled={isExpanded}
        >
          <div 
            ref={flipInnerRef}
            className="coin-flip-inner"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Front side - Shopping Cart Icon */}
            <div 
              className="coin-flip-face coin-flip-front"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            >
              <ShoppingCart 
                className={cn(
                  isExpanded && "opacity-0"
                )}
                style={{
                  width: '30px',
                  height: '30px',
                  strokeWidth: 2.5,
                }}
              />
            </div>
            
            {/* Back side - Add to Cart Text */}
            <div 
              className="coin-flip-face coin-flip-back"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#000000',
                transform: 'rotateY(180deg)',
                fontSize: '11px',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '4px',
                lineHeight: '1.2',
                wordSpacing: '0px',
                border: '0.5px solid white',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ whiteSpace: 'normal', color: 'red', fontSize: '11px', fontWeight: 'bold' }}>Add to Cart</span>
            </div>
          </div>
        </button>

        {/* Success Checkmark Overlay - CodePen exact measurements - Only show on green side */}
        <div 
          className={cn(
            "absolute pointer-events-none transition-opacity duration-300",
          isExpanded && isFlippedToGreen && "opacity-100 delay-[600ms]"
          )}
          style={{
            position: 'absolute',
            top: '50%',
            left: '37%',
            transform: 'translate(-50%, -50%)',
            opacity: (isExpanded && isFlippedToGreen) ? 1 : 0,
            zIndex: 999,
            ...(isExpanded && isFlippedToGreen && {
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



