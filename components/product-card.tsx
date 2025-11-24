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
  const [lastClickTime, setLastClickTime] = useState<number | null>(null)
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

  // Ensure animation is stopped during expansion and button stays green
  useEffect(() => {
    if (isExpanded && flipInnerRef.current) {
      // Stop animation completely and force green side during entire expansion
      flipInnerRef.current.style.animation = 'none'
      flipInnerRef.current.style.animationPlayState = 'paused'
      flipInnerRef.current.style.transform = 'rotateY(0deg)'
      flipInnerRef.current.style.transition = 'transform 0s'
      // Remove any CSS classes that might trigger animation
      flipInnerRef.current.classList.remove('coin-flip-active')
    }
  }, [isExpanded])
  
  // Check if 60 seconds have passed since last click
  const shouldPauseAnimation = () => {
    if (lastClickTime === null) return false
    const timeSinceClick = Date.now() - lastClickTime
    return timeSinceClick < 60000 // 60 seconds in milliseconds
  }

  // Re-enable animation only after expansion is completely done and 60s passed
  useEffect(() => {
    if (!isExpanded && flipInnerRef.current) {
      // Wait a bit to ensure expansion cleanup is done
      const timer = setTimeout(() => {
        if (flipInnerRef.current && !isExpanded) {
          const isPaused = shouldPauseAnimation()
          const shouldAnimate = !isPaused && ((isMobile && isInViewport) || (!isMobile && isHovered))
          
          if (shouldAnimate) {
            flipInnerRef.current.style.animation = ''
            flipInnerRef.current.style.animationPlayState = ''
            flipInnerRef.current.style.transition = ''
          } else {
            // Stop animation and ensure it's at green side
            flipInnerRef.current.style.animation = 'none'
            flipInnerRef.current.style.animationPlayState = 'paused'
            flipInnerRef.current.style.transform = 'rotateY(0deg)'
            flipInnerRef.current.style.transition = 'transform 0s'
          }
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isExpanded, isMobile, isInViewport, isHovered, lastClickTime])

  // Resume animation after 60 seconds if conditions are met
  useEffect(() => {
    if (lastClickTime !== null && !isExpanded) {
      const timer = setTimeout(() => {
        // 60 seconds have passed, check if we should resume
        if (flipInnerRef.current && !isExpanded) {
          const shouldAnimate = (isMobile && isInViewport) || (!isMobile && isHovered)
          if (shouldAnimate) {
            flipInnerRef.current.style.animation = ''
            flipInnerRef.current.style.animationPlayState = ''
            flipInnerRef.current.style.transition = ''
          }
        }
      }, 60000) // 60 seconds
      
      return () => clearTimeout(timer)
    }
  }, [lastClickTime, isExpanded, isMobile, isInViewport, isHovered])

  const handleAddToCart = () => {
    // Record click time to pause animation for 60 seconds
    setLastClickTime(Date.now())
    
    // Immediately stop flip animation and force green side
    if (flipInnerRef.current) {
      // Stop animation completely
      flipInnerRef.current.style.animation = 'none'
      flipInnerRef.current.style.animationPlayState = 'paused'
      // Force to green side immediately
      flipInnerRef.current.style.transform = 'rotateY(0deg)'
      flipInnerRef.current.style.transition = 'transform 0.3s ease-in-out'
      // Remove animation class
      flipInnerRef.current.classList.remove('coin-flip-active')
    }
    
    setIsFlippedToGreen(true)
    
    // Wait for flip to green to complete, then expand
    setTimeout(() => {
      // Ensure still on green before expanding
      if (flipInnerRef.current) {
        flipInnerRef.current.style.transform = 'rotateY(0deg)'
        flipInnerRef.current.style.transition = 'transform 0s'
      }
      
      onAddToCart(seedling)
      setIsExpanded(true)
      
      // Keep expansion for full duration (about 3 seconds total)
      setTimeout(() => {
        setIsExpanded(false)
      }, 3000) // Full 3 seconds for expansion and checkmark
    }, 350)
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
            // Trigger flip animation: on hover (web) or when in viewport (mobile), 
            // but NOT during expansion and NOT within 60s of click
            !isExpanded && 
            !shouldPauseAnimation() &&
            ((isMobile && isInViewport) || (!isMobile && isHovered)) ? "coin-flip-active" : ""
          )}
          data-expanded={isExpanded}
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
                border: '3px solid white',
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



