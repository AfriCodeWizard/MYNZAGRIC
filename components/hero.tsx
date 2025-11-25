"use client"
import { useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import Navbar from "@/components/navbar" // Import the Navbar component

export default function Hero() {
  const [count, setCount] = useState(0)

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
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
        <source src="https://videos.pexels.com/video-files/19570489/19570489-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay - Radial gradient: lighter center, darker edges - matching irri-hub.com */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.85) 100%)'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen pt-[82px] md:pt-24">
        {/* Navbar */}
        <Navbar /> {/* Using the new Navbar component with animated hover effects */}
        {/* Main Content */}
        <main className="mt-8 sm:mt-6 md:mt-12 flex-grow flex flex-col justify-center">
          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] sm:leading-tight mb-3 sm:mb-4 md:mb-5">
              <span className="font-light text-green-400">GROW WITH</span>
              <br />
              <span className="font-bold text-white">MYNZAGRIC</span>
            </h1>
            <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg text-gray-200 max-w-xl leading-relaxed">
              Certified grafted fruit seedlings ready for transplanting. Premium quality seedlings from Kenya's trusted
              nursery.
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
                  Get Started
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
          <div className="relative bg-black/30 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 text-white overflow-hidden w-[95px] h-[95px] sm:w-auto sm:h-auto sm:aspect-square shadow-lg sm:shadow-xl">
            {/* Animated White Glow on Left */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 bg-white/80 blur-sm"
              style={{
                animation: 'glow 2s ease-in-out infinite',
              }}
            />
            <div className="text-left h-full flex flex-col justify-center">
              <p className="text-lg sm:text-2xl font-bold">{count.toLocaleString()}+</p>
              <p className="text-[10px] sm:text-sm leading-tight mt-0.5 sm:mt-1">Satisfied Clients</p>
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
            className="relative bg-gradient-to-tr from-white/15 to-white/45 backdrop-blur-md border border-white/30 p-4 sm:p-5 md:p-6 text-white overflow-hidden w-[200px] sm:w-[280px] md:w-[320px] lg:w-[340px] shadow-lg sm:shadow-xl" 
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
            <div className="relative z-10 flex flex-col h-full">
              {/* Top Right Button */}
              <div className="flex items-start justify-end mb-3 sm:mb-4">
                <button className="bg-green-900/80 hover:bg-green-900 p-1.5 sm:p-2 rounded-full transition-colors shrink-0">
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2} />
                </button>
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">Frutopia Value Pack</h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed flex-grow">
                Complete farming solutions with seedlings + <strong className="text-green-300">drip irrigation kits</strong>. Start your 1-acre farm today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
