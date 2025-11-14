"use client"
import { useState, useEffect } from "react"
import { MapPin, ArrowUpRight } from "lucide-react"
import Navbar from "@/components/navbar" // Import the Navbar component

export default function Hero() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 500
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen pt-20 md:pt-24">
        {/* Navbar */}
        <Navbar /> {/* Using the new Navbar component with animated hover effects */}
        {/* Main Content */}
        <main className="mt-8 md:mt-16 flex-grow">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="font-light">GROW WITH</span>
              <br />
              <span className="text-green-300 font-black">MYNZAGRIC</span>
            </h1>
            <p className="mt-4 md:mt-6 text-lg text-gray-200 max-w-xl">
              Certified grafted fruit seedlings ready for transplanting. Premium quality seedlings from Kenya's trusted
              nursery.
            </p>
          </div>
        </main>
        {/* Footer with CTA and Featured Card */}
        <footer className="py-4 md:py-6 mt-auto">
          <div className="flex items-end justify-between">
            <div className="w-full lg:w-auto">
              <div className="flex items-center space-x-6">
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="#seedlings"
                  className="text-white border-b border-white/50 pb-1 font-semibold hover:border-white transition-colors"
                >
                  Explore Products
                </a>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Right Side Cards - Aligned on same vertical line with equal spacing from edge */}
        {/* Satisfied Clients Card - Top Right - Perfect Square */}
        <div className="absolute top-20 right-8 hidden xl:block">
          <div className="relative bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white overflow-hidden aspect-square w-auto h-auto">
            {/* Animated White Glow on Left */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 bg-white/80 blur-sm"
              style={{
                animation: 'glow 2s ease-in-out infinite',
              }}
            />
            <div className="text-left h-full flex flex-col justify-center">
              <p className="text-2xl font-bold">{count}+</p>
              <p className="text-sm">Satisfied Clients</p>
              <div className="flex -space-x-2 mt-4 justify-start">
                <div className="w-8 h-8 rounded-full border-2 border-white/50 bg-transparent" />
                <div className="w-8 h-8 rounded-full border-2 border-white/50 bg-transparent" />
                <div className="w-8 h-8 rounded-full border-2 border-white/50 bg-transparent" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Project Card - Bottom Right - Aligned with top card */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div 
            className="relative bg-gradient-to-tr from-white/10 to-white/40 backdrop-blur-md border border-white/20 p-6 text-white max-w-sm overflow-hidden" 
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
            <div className="relative z-10">
              {/* Top Icons Row */}
              <div className="flex items-start justify-between mb-3">
                {/* Location Pin Icon - Top Left */}
                <MapPin className="w-5 h-5 text-white/80" strokeWidth={2} />
                {/* Dark Green Circular Button - Top Right */}
                <button className="bg-green-900/80 hover:bg-green-900 p-2 rounded-full transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2} />
                </button>
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-lg mb-2">Premium Seedlings</h3>
              
              {/* Description */}
              <p className="text-sm text-gray-300">
                Grafted and tissue-cultured disease-resistant seedlings for beautiful, sustainable produce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
