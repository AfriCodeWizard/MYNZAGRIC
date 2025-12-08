"use client"
import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar" // Import the Navbar component

// Value pack data for cycling animation
const valuePacks = [
  {
    id: "mango",
    name: "Mango Value Pack",
    fruit: "Grafted Mango Seedlings",
    quantity: 150,
    price: 115000,
    varieties: ["Tommy", "Van Dyke", "Apple", "Kent", "Ngowe"],
    maturity: "3 years"
  },
  {
    id: "avocado",
    name: "Avocado Value Pack",
    fruit: "Grafted Avocado Seedlings",
    quantity: 150,
    price: 115000,
    varieties: ["Fuerte", "Hass"],
    maturity: "3 years"
  },
  {
    id: "pixie-orange",
    name: "Pixie Orange Value Pack",
    fruit: "Grafted Pixie Orange Seedlings",
    quantity: 256,
    price: 175000,
    varieties: ["Pixie Orange"],
    maturity: "3 years"
  },
  {
    id: "citrus",
    name: "Citrus Value Pack",
    fruit: "Grafted Citrus Seedlings",
    quantity: 256,
    price: 145000,
    varieties: ["Tangerine", "Washington Oranges", "Valencia Oranges", "Green Lemon", "Eureka Lemon", "Lisbon Lemon"],
    maturity: "3 years"
  }
]

// Video array with all three videos - defined outside component to avoid recreation
const videos = [
  {
    src: "https://videos.pexels.com/video-files/19570489/19570489-hd_1920_1080_30fps.mp4",
    id: "19570489"
  },
  {
    // Grapes close-up - Local WEBM file
    src: "/grapes.webm",
    id: "grapes",
    attribution: "Video by Joshua Malic"
  },
  {
    // Mangoes on tree - Local WEBM file
    src: "/mango.webm",
    id: "mango",
    attribution: "Video by ROMAN ODINTSOV"
  }
]

export default function Hero() {
  const [count, setCount] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentPackIndex, setCurrentPackIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const target = 3000000
    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps for smooth animation
    const increment = target / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  // Video rotation effect with smooth transitions
  useEffect(() => {
    // Initialize all videos
    videos.forEach((_, index) => {
      const videoElement = videoRefs.current[index]
      if (videoElement) {
        videoElement.load()
        // Handle video loading errors
        videoElement.addEventListener('error', (e) => {
          console.error(`Video ${videos[index].id} failed to load:`, e)
        })
        // Set playback rates
        if (index === 0) {
          // First video (orange/pexels) - normal speed initially
          videoElement.playbackRate = 1.0
        } else if (index === 2) {
          // Mango video - increase speed
          videoElement.playbackRate = 1.5
        }
      }
    })

    // Play current video
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.play().catch((error) => {
        console.error('Video play failed:', error)
      })
    }

    // Handle first video slowdown at 5 seconds (only when first video is playing)
    let firstVideoSlowdownTimer: NodeJS.Timeout | null = null
    if (currentVideoIndex === 0) {
      const firstVideo = videoRefs.current[0]
      if (firstVideo) {
        firstVideoSlowdownTimer = setTimeout(() => {
          if (firstVideo && currentVideoIndex === 0) {
            firstVideo.playbackRate = 0.5 // Slow down at 5 seconds
          }
        }, 5000)
      }
    }

    // Rotate videos every 10 seconds with smooth crossfade transitions
    const rotationInterval = setInterval(() => {
      const currentVideo = videoRefs.current[currentVideoIndex]
      const nextIndex = (currentVideoIndex + 1) % videos.length
      const nextVideo = videoRefs.current[nextIndex]

      if (currentVideo && nextVideo) {
        // Reset next video
        nextVideo.currentTime = 0
        
        // Ensure next video is loaded and ready
        const startTransition = () => {
          // Start playing next video in background (invisible)
          nextVideo.play().catch(() => {})
          
          // Wait for video to have enough data to play smoothly
          const checkReady = () => {
            if (nextVideo.readyState >= 3) { // HAVE_FUTURE_DATA - enough data to play
              // Both videos are now playing - start crossfade
              // Current video fades out, next video fades in simultaneously
              currentVideo.style.transition = "opacity 2.5s ease-in-out"
              nextVideo.style.transition = "opacity 2.5s ease-in-out"
              
              // Start the crossfade
              currentVideo.style.opacity = "0"
              nextVideo.style.opacity = "1"
              
              // Update state after transition completes
              setTimeout(() => {
                setCurrentVideoIndex(nextIndex)
                // Clean up previous video
                currentVideo.pause()
                currentVideo.style.opacity = "1" // Reset for next cycle
                // Reset playback rate for first video if it was slowed
                if (currentVideoIndex === 0) {
                  currentVideo.playbackRate = 1.0
                }
              }, 2500)
            } else {
              // Wait a bit more if not ready
              setTimeout(checkReady, 100)
            }
          }
          
          // Start checking when video can play
          if (nextVideo.readyState >= 2) {
            checkReady()
          } else {
            nextVideo.addEventListener('canplay', checkReady, { once: true })
          }
        }
        
        startTransition()
      }
    }, 10000) // Change video every 10 seconds

    return () => {
      clearInterval(rotationInterval)
      if (firstVideoSlowdownTimer) {
        clearTimeout(firstVideoSlowdownTimer)
      }
    }
  }, [currentVideoIndex])

  // Value pack cycling effect - every 5 seconds
  useEffect(() => {
    const packInterval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPackIndex((prev) => (prev + 1) % valuePacks.length)
        setIsTransitioning(false)
      }, 300) // Half of transition duration for smooth fade
    }, 5000) // Change every 5 seconds

    return () => clearInterval(packInterval)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background - Multiple videos with smooth transitions */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, backgroundColor: "#000000" }}>
        {videos.map((video, index) => {
          const isCurrent = index === currentVideoIndex
          const isNext = index === (currentVideoIndex + 1) % videos.length
          // Show current video and next video (for smooth crossfade)
          const shouldShow = isCurrent || isNext
          
          return (
            <video
              key={video.id}
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              autoPlay={index === 0}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: isCurrent ? 1 : isNext ? 0 : 0,
                transition: "opacity 2.5s ease-in-out",
                zIndex: isCurrent ? 2 : isNext ? 1 : 0,
                pointerEvents: 'none',
              }}
            >
              <source src={video.src} type={video.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            </video>
          )
        })}
      </div>

      {/* Dark Overlay - Radial gradient: lighter center, darker edges - matching irri-hub.com */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.85) 100%)',
          zIndex: 1
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen pt-[82px] md:pt-24">
        {/* Navbar */}
        <Navbar /> {/* Using the new Navbar component with animated hover effects */}
        {/* Main Content */}
        <main className="mt-8 sm:mt-6 md:mt-12 flex-grow flex flex-col justify-center">
          <div className="max-w-3xl relative z-10 mb-16 sm:mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] sm:leading-tight mb-3 sm:mb-4 md:mb-5">
              <span className="font-light text-green-400">GROW WITH</span>
              <br />
              <span className="font-bold text-white">MYNZAGRIC</span>
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg text-gray-200 max-w-xl leading-relaxed">
              Premium fruit and flower seedlings with precision drip irrigation kits. Transform your farm with certified grafted varieties and efficient water management solutions from a trusted global agricultural partner.
            </p>
          </div>
        </main>
        {/* Footer with CTA and Featured Card */}
        <footer className="py-4 md:py-5 mt-6 sm:mt-4 pb-4 sm:pb-5 md:pb-6">
          <div className="flex items-end justify-between">
            <div className="w-full lg:w-auto">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href="https://wa.me/254713764658"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-7 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base whitespace-nowrap shadow-md"
                >
                  Partner with Us
                </a>
                <a
                  href="#seedlings"
                  className="text-white border-b border-white/50 pb-1 font-semibold hover:border-white transition-colors text-sm sm:text-base"
                >
                  Explore Products
                </a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Right Side Cards - Responsive positioning */}
        {/* Satisfied Clients Card - Responsive positioning */}
        <div className="absolute top-28 sm:top-32 right-4 sm:right-8 xl:right-8 z-[5]">
          <div className="relative bg-black/30 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white overflow-hidden min-w-[160px] w-[160px] h-[80px] sm:min-w-[200px] sm:w-[200px] sm:h-[160px] shadow-lg sm:shadow-xl">
            {/* Animated White Glow on Left */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 bg-white/80 blur-sm"
              style={{
                animation: 'glow 2s ease-in-out infinite',
              }}
            />
            <div className="text-left h-full flex flex-col justify-center">
              <p className="text-lg sm:text-2xl font-bold whitespace-nowrap min-w-[140px] sm:min-w-[170px]">{count.toLocaleString()}+</p>
              <p className="text-[10px] sm:text-sm leading-tight mt-0.5 sm:mt-1">Customers Served</p>
              <div className="flex -space-x-1.5 sm:-space-x-2 mt-1.5 sm:mt-4 justify-start">
                <div className="w-4 h-4 sm:w-8 sm:h-8 rounded-full border-2 border-white/50 bg-transparent" />
                <div className="w-4 h-4 sm:w-8 sm:h-8 rounded-full border-2 border-white/50 bg-transparent" />
                <div className="w-4 h-4 sm:w-8 sm:h-8 rounded-full border-2 border-white/50 bg-transparent" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Project Card - Above buttons on mobile, original position on desktop */}
        <div className="absolute bottom-24 sm:bottom-28 md:bottom-32 right-4 sm:right-4 md:right-8 lg:bottom-8 lg:right-8 z-[5]">
          <div 
            className="relative bg-gradient-to-tr from-white/15 to-white/45 backdrop-blur-md border border-white/30 p-3 sm:p-4 md:p-5 text-white overflow-hidden w-[200px] sm:w-[280px] md:w-[320px] lg:w-[340px] shadow-lg sm:shadow-xl" 
            style={{ borderRadius: '12px' }}
          >
            {/* Diagonal Transparency Gradient Overlay - from bottom-left (transparent) to top-right (opaque) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.07) 0%, rgba(0, 0, 0, 0.12) 30%, rgba(0, 0, 0, 0.22) 60%, rgba(0, 0, 0, 0.35) 100%)',
                borderRadius: '12px',
                mixBlendMode: 'multiply',
              }}
            />
            {/* Animated shimmer effect */}
            <div 
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ borderRadius: '12px' }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 3s infinite',
                }}
              />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              {/* Top Right Button */}
              <div className="flex items-start justify-end mb-2 sm:mb-3">
                <Link href="#frutopia" className="bg-green-900/80 hover:bg-green-900 p-1.5 sm:p-2 rounded-full transition-colors shrink-0">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2} />
                </Link>
              </div>
              
              {/* Cycling Content with smooth transition */}
              <div className="relative min-h-[80px] sm:min-h-[100px]">
                <div
                  key={currentPackIndex}
                  className={`transition-all ease-in-out ${
                    isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                  style={{
                    transitionDuration: '600ms',
                  }}
                >
                  {/* Title */}
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">
                    {valuePacks[currentPackIndex].name}
                  </h3>
                  
                  {/* Dynamic Description */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      <span className="text-green-300 font-semibold">{valuePacks[currentPackIndex].quantity} seedlings</span> • {valuePacks[currentPackIndex].fruit}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {valuePacks[currentPackIndex].varieties.slice(0, 2).join(", ")}
                      {valuePacks[currentPackIndex].varieties.length > 2 && " +more"}
                    </p>
                    <p className="text-xs sm:text-sm text-green-300 font-semibold mt-1">
                      KES {valuePacks[currentPackIndex].price.toLocaleString()} • {valuePacks[currentPackIndex].maturity}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 italic">
                      + <strong className="text-green-300">drip irrigation kits</strong> included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
