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
  image?: string
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
  const [isCollapsing, setIsCollapsing] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFlippedToGreen, setIsFlippedToGreen] = useState(true)
  const [lastClickTime, setLastClickTime] = useState<number | null>(null)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
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
  
  // Update pause state based on lastClickTime (only in useEffect to avoid hydration issues)
  useEffect(() => {
    if (lastClickTime === null) {
      setIsAnimationPaused(false)
      return
    }
    
    // Set paused immediately
    setIsAnimationPaused(true)
    
    // Check periodically if 60 seconds have passed
    const checkInterval = setInterval(() => {
      if (lastClickTime === null) {
        setIsAnimationPaused(false)
        clearInterval(checkInterval)
        return
      }
      const timeSinceClick = Date.now() - lastClickTime
      if (timeSinceClick >= 60000) {
        setIsAnimationPaused(false)
        clearInterval(checkInterval)
      }
    }, 1000) // Check every second
    
    // Also set a timeout to clear after exactly 60 seconds
    const timeout = setTimeout(() => {
      setIsAnimationPaused(false)
      clearInterval(checkInterval)
    }, 60000)
    
    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeout)
    }
  }, [lastClickTime])

  // Stop/resume animation based on pause state and other conditions
  useEffect(() => {
    if (!flipInnerRef.current) return
    
    const button = flipInnerRef.current.closest('.coin-flip-button') as HTMLElement | null
    
    if (isExpanded) {
      // During expansion: COMPLETELY stop animation and force green
      flipInnerRef.current.style.animation = 'none'
      flipInnerRef.current.style.animationPlayState = 'paused'
      flipInnerRef.current.style.animationName = 'none'
      flipInnerRef.current.style.transform = 'rotateY(0deg)'
      flipInnerRef.current.style.transition = 'none'
      flipInnerRef.current.classList.remove('coin-flip-active')
      if (button) {
        button.classList.add('coin-flip-disabled')
        button.classList.remove('coin-flip-active')
      }
    } else if (isAnimationPaused) {
      // When paused: stop animation and keep green
      flipInnerRef.current.style.animation = 'none'
      flipInnerRef.current.style.animationPlayState = 'paused'
      flipInnerRef.current.style.animationName = 'none'
      flipInnerRef.current.style.transform = 'rotateY(0deg)'
      flipInnerRef.current.style.transition = 'none'
      flipInnerRef.current.classList.remove('coin-flip-active')
      if (button) {
        button.classList.add('coin-flip-disabled')
        button.classList.remove('coin-flip-active')
      }
    } else {
      // Resume animation if not paused and not expanded
      if (button) {
        button.classList.remove('coin-flip-disabled')
      }
      const shouldAnimate = ((isMobile && isInViewport) || (!isMobile && isHovered))
      if (shouldAnimate) {
        flipInnerRef.current.style.animation = ''
        flipInnerRef.current.style.animationPlayState = ''
        flipInnerRef.current.style.animationName = ''
        flipInnerRef.current.style.transition = ''
      } else {
        // Stop if conditions not met
        flipInnerRef.current.style.animation = 'none'
        flipInnerRef.current.style.animationPlayState = 'paused'
        flipInnerRef.current.style.transform = 'rotateY(0deg)'
        flipInnerRef.current.style.transition = 'transform 0s'
        flipInnerRef.current.classList.remove('coin-flip-active')
      }
    }
  }, [isAnimationPaused, isExpanded, isMobile, isInViewport, isHovered])

  // Re-enable animation only after expansion is completely done and 60s passed
  useEffect(() => {
    if (!isExpanded && flipInnerRef.current) {
      // Wait a bit to ensure expansion cleanup is done
      const timer = setTimeout(() => {
        if (flipInnerRef.current && !isExpanded) {
          // If paused, always stop animation
          if (isAnimationPaused) {
            flipInnerRef.current.style.animation = 'none'
            flipInnerRef.current.style.animationPlayState = 'paused'
            flipInnerRef.current.style.transform = 'rotateY(0deg)'
            flipInnerRef.current.style.transition = 'transform 0s'
            flipInnerRef.current.classList.remove('coin-flip-active')
            return
          }
          
          const shouldAnimate = ((isMobile && isInViewport) || (!isMobile && isHovered))
          
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
            flipInnerRef.current.classList.remove('coin-flip-active')
          }
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isExpanded, isMobile, isInViewport, isHovered, isAnimationPaused])

  const handleAddToCart = () => {
    // IMMEDIATELY stop flip animation - this must happen first
    if (flipInnerRef.current) {
      // Completely stop and remove all animation
      flipInnerRef.current.style.animation = 'none !important'
      flipInnerRef.current.style.animationPlayState = 'paused'
      flipInnerRef.current.style.animationName = 'none'
      flipInnerRef.current.style.animationDuration = '0s'
      flipInnerRef.current.style.animationIterationCount = '0'
      // Force to green side immediately with no transition
      flipInnerRef.current.style.transform = 'rotateY(0deg) !important'
      flipInnerRef.current.style.transition = 'none'
      // Remove animation class immediately
      flipInnerRef.current.classList.remove('coin-flip-active')
      // Also remove from parent button
      const button = flipInnerRef.current.closest('.coin-flip-button')
      if (button) {
        button.classList.remove('coin-flip-active')
      }
    }
    
    // Record click time to pause animation for 60 seconds
    setLastClickTime(Date.now())
    setIsFlippedToGreen(true)
    
    // Immediately ensure green side is showing (no delay)
    if (flipInnerRef.current) {
      flipInnerRef.current.style.transform = 'rotateY(0deg) !important'
      flipInnerRef.current.style.transition = 'none'
    }
    
    // Start expansion immediately without waiting
    // Set price to 0 for flowers and trees - price will be communicated upon order request
    const cartItem = {
      ...seedling,
      price: (seedling.category === "flowers" || seedling.category === "trees") ? 0 : seedling.price
    }
    onAddToCart(cartItem)
    setIsExpanded(true)
    setIsCollapsing(false)
    
    // Checkmark appears at 600ms delay + 300ms transition = 900ms total
    // Start collapse animation right after checkmark completes
    setTimeout(() => {
      // Start collapse animation - set collapsing first
      setIsCollapsing(true)
      // Then remove expanded state to trigger collapse animation
      requestAnimationFrame(() => {
        setIsExpanded(false)
        // Reset collapsing state after animation completes
        setTimeout(() => {
          setIsCollapsing(false)
        }, 300) // Match transition duration (250ms) + small buffer
      })
    }, 1000) // Start collapse 1 second after expansion (checkmark completes at ~900ms)
  }

  const categoryLabel = seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={cn(
        "relative bg-white overflow-hidden text-center rounded-lg group border border-green-400",
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
      <div className="relative w-full overflow-hidden" style={{ minHeight: '180px', height: '180px' }}>
        {seedling.image ? (
          <img 
            src={seedling.image.split('/').map((part, index) => 
              index === 0 ? part : encodeURIComponent(part)
            ).join('/')} 
            alt={`${seedling.name} - Premium grafted ${seedling.category} seedling available at Mynzagric`}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            style={{ width: '100%', height: '100%', minHeight: '180px' }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const imagePath = seedling.image;
              console.error('Image failed to load:', imagePath, 'for', seedling.name);
              if (imagePath) {
                console.error('Encoded path:', imagePath.split('/').map((part, index) => 
                  index === 0 ? part : encodeURIComponent(part)
                ).join('/'));
              }
              // Hide the broken image and show icon instead
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-8xl transform transition-transform duration-300 hover:scale-110';
                fallback.style.minHeight = '180px';
                fallback.textContent = seedling.icon;
                parent.appendChild(fallback);
              }
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', seedling.image);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-8xl transform transition-transform duration-300 hover:scale-110" style={{ minHeight: '180px', height: '180px' }}>
            {seedling.icon}
          </div>
        )}
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
            isExpanded && "pointer-events-none coin-flip-disabled",
            isAnimationPaused && "coin-flip-disabled",
            // Trigger flip animation: on hover (web) or when in viewport (mobile), 
            // but NOT during expansion and NOT within 60s of click
            !isExpanded && 
            !isAnimationPaused &&
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
            // Smooth transition for expansion and collapse
            transition: isExpanded 
              ? 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), right 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              : isCollapsing
              ? 'width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), right 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : 'none',
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
        {/* Price removed for flowers and trees - price to be communicated upon order request */}
        {seedling.category !== "flowers" && seedling.category !== "trees" && (
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
        )}

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



