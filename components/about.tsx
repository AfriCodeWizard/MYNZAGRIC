"use client"

import { Heart, PenTool, Leaf, Lightbulb } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function About() {
  const stickyRef = useRef<HTMLDivElement>(null)
  const blockquoteRef = useRef<HTMLQuoteElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const card4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stickyRef.current || typeof window === "undefined") return

    // Wait for refs to be available
    const initAnimations = () => {
      // Check if all refs are available
      if (!card1Ref.current || !card2Ref.current || !card3Ref.current || !card4Ref.current) {
        console.warn('Card refs not ready, retrying...')
        setTimeout(initAnimations, 100)
        return
      }

      const isMobile = window.innerWidth < 768

      if (isMobile) {
        // Mobile: Simple fade-in animations
        const mobileTl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } })
        
        if (blockquoteRef.current) {
          gsap.set(blockquoteRef.current, { opacity: 0, y: -20 })
          mobileTl.to(blockquoteRef.current, { opacity: 1, y: 0 })
        }
        if (spanRef.current) {
          gsap.set(spanRef.current, { width: 0 })
          mobileTl.to(spanRef.current, { width: "100%" }, "-=0.3")
        }
        
        // Animate cards with stagger
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current]
        cards.forEach((card, index) => {
          if (card) {
            gsap.set(card, { opacity: 0, y: 20 })
            mobileTl.to(card, { opacity: 1, y: 0 }, index * 0.1)
          }
        })

        return () => {
          mobileTl.kill()
        }
      } else {
        // Desktop: Scroll-triggered animations
        const tl = gsap.timeline()

        // Animate blockquote
        if (blockquoteRef.current) {
          tl.from(blockquoteRef.current, {
            duration: 0.5,
            x: 200,
            opacity: 0,
            ease: "power2.out"
          })
        }
        if (spanRef.current) {
          tl.from(spanRef.current, {
            duration: 1,
            width: 0,
            ease: "power2.out"
          }, "-=0.5")
        }
        
        // Set initial state for cards (hidden and offset)
        if (card1Ref.current) {
          gsap.set(card1Ref.current, { x: -200, opacity: 0 })
          tl.to(card1Ref.current, {
            duration: 1,
            x: 0,
            opacity: 1,
            ease: "power4.inOut"
          }, "-=1")
        }
        if (card2Ref.current) {
          gsap.set(card2Ref.current, { x: -200, opacity: 0 })
          tl.to(card2Ref.current, {
            duration: 1,
            x: 0,
            opacity: 1,
            ease: "power4.inOut"
          }, "-=0.9")
        }

        // Animate cards 3 & 4
        if (card3Ref.current) {
          gsap.set(card3Ref.current, { x: 200, opacity: 0 })
          tl.to(card3Ref.current, {
            duration: 1,
            x: 0,
            opacity: 1,
            ease: "power4.inOut"
          }, "-=0.7")
        }
        if (card4Ref.current) {
          gsap.set(card4Ref.current, { x: 200, opacity: 0 })
          tl.to(card4Ref.current, {
            duration: 1,
            x: 0,
            opacity: 1,
            ease: "power4.inOut"
          }, "-=0.5")
        }

        // Create ScrollTrigger for sticky section - all animations tied to scroll (desktop only)
        const scrollTrigger = ScrollTrigger.create({
          trigger: stickyRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          animation: tl,
          anticipatePin: 1,
        })

        // Animate box - separate timeline that triggers after scroll completes
        const tl2 = gsap.timeline({ paused: true })
        if (boxRef.current) {
          tl2.from(boxRef.current, {
            duration: 1,
            opacity: 0,
            scale: 0,
            ease: "back.out(1.7)"
          })
          tl2.to(boxRef.current, {
            duration: 0.5,
            left: "20%",
            scale: 1.3,
            borderColor: "white",
            borderWidth: 12,
            boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.09)",
            ease: "power2.out"
          })
        }

        // Create ScrollTrigger for box animation - triggers when blockquote is in view
        const scrollTrigger2 = ScrollTrigger.create({
          trigger: blockquoteRef.current,
          start: "top 80%",
          animation: tl2,
          once: true,
        })

        return () => {
          scrollTrigger.kill()
          scrollTrigger2.kill()
          tl.kill()
          tl2.kill()
        }
      }
    }

    // Start initialization
    const timeoutId = setTimeout(initAnimations, 200)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const features = [
    {
      icon: Heart,
      title: "Passion in every work",
      description: "Professionally grafted and certified disease-resistant seedlings for beautiful, sustainable produce. Our expert team ensures premium quality that delivers exceptional yields.",
    },
    {
      icon: PenTool,
      title: "Collaboration on top",
      description: "Partnering with farmers to share expertise and achieve growing success together. We provide ongoing support from planting to harvest with comprehensive guidance.",
    },
    {
      icon: Leaf,
      title: "Sustainability in check",
      description: "Committed to eco-friendly practices that nurture both your crops and the environment. Water-efficient irrigation and organic methods for sustainable farming.",
    },
    {
      icon: Lightbulb,
      title: "Creativity unleashed",
      description: "Innovative solutions tailored to your unique farming vision. From custom value packs to precision irrigation systems, we design complete farming solutions.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="sticky-section relative min-h-screen bg-gradient-to-b from-green-900 to-green-950"
    >
      <div
        ref={stickyRef}
        className="sticky-container relative h-screen md:h-screen w-full"
      >
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative about-container overflow-hidden"
        >
          {/* Mobile Layout - Grid Structure */}
          <div className="md:hidden flex flex-col h-full py-4">
            {/* WE ARE DIFFERENT Heading - Mobile */}
            <blockquote
              ref={blockquoteRef}
              className="text-2xl font-bold text-white z-10 mb-6"
            >
              WE ARE <span className="font-light text-green-400">DIFFERENT</span>
              <br />& IN EVERY WAY
              <span
                ref={spanRef}
                className="block w-full h-1 bg-green-400 mt-2"
              />
            </blockquote>

            {/* Cards Grid - Mobile: Single column for better readability */}
            <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto">
              {/* Top Row - Cards 1 & 2 */}
              <div
                ref={card1Ref}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 flex flex-row items-start gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-12 h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 flex-shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-2 text-sm">{features[0].title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{features[0].description}</p>
                </div>
              </div>

              <div
                ref={card2Ref}
                data-card="2"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 flex flex-row items-start gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-12 h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 flex-shrink-0">
                  <PenTool className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-2 text-sm">{features[1].title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{features[1].description}</p>
                </div>
              </div>

              {/* Bottom Row - Cards 3 & 4 */}
              <div
                ref={card3Ref}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 flex flex-row items-start gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-12 h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 flex-shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-2 text-sm">{features[2].title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{features[2].description}</p>
                </div>
              </div>

              <div
                ref={card4Ref}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 flex flex-row items-start gap-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-12 h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 flex-shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-2 text-sm">{features[3].title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{features[3].description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Absolute Positioning */}
          <div className="hidden md:block h-full relative">
            {/* WE ARE DIFFERENT Heading */}
            <blockquote
              ref={blockquoteRef}
              className="absolute text-3xl md:text-4xl lg:text-5xl font-bold text-white w-[40%] lg:w-[35%] mt-[12%] md:mt-[17%] z-10 left-6 lg:left-8"
            >
              WE ARE <span className="font-light text-green-400">DIFFERENT</span>
              <br />& IN EVERY WAY
              <span
                ref={spanRef}
                className="block w-full h-1 bg-green-400 mt-5"
              />
            </blockquote>

            {/* Cards 1 & 2 - Replace office image (larger, foreground, far right) - Side by side */}
            <div
              ref={card1Ref}
              className="absolute right-6 lg:right-8 top-[20%] w-[28%] md:w-[22%] bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 lg:p-5 flex flex-col items-center justify-center text-center z-20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
              style={{ willChange: 'transform, opacity', maxHeight: '240px' }}
            >
              <div className="w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 lg:mb-3">
                <Heart className="w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2 lg:mb-3 text-xs lg:text-sm">{features[0].title}</h3>
              <p className="text-[9px] lg:text-[10px] text-gray-300 leading-tight" style={{ maxHeight: '140px', overflow: 'hidden' }}>{features[0].description}</p>
            </div>

            <div
              ref={card2Ref}
              data-card="2"
              className="absolute top-[20%] right-[calc(28%+22%+2rem)] md:right-[calc(22%+22%+2rem)] w-[28%] md:w-[22%] bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 lg:p-5 flex flex-col items-center justify-center text-center z-20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
              style={{ willChange: 'transform, opacity', maxHeight: '240px' }}
            >
              <div className="w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 lg:mb-3">
                <PenTool className="w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2 lg:mb-3 text-xs lg:text-sm">{features[1].title}</h3>
              <p className="text-[9px] lg:text-[10px] text-gray-300 leading-tight" style={{ maxHeight: '140px', overflow: 'hidden' }}>{features[1].description}</p>
            </div>

            {/* Cards 3 & 4 - Replace building image (smaller, background, below heading line) - Side by side with consistent spacing matching right cards */}
            <div
              ref={card3Ref}
              className="absolute right-[calc(42%+22%+2rem)] md:right-[calc(42%+22%+2rem)] top-[calc(12%+11rem+1rem)] md:top-[calc(17%+14rem+1.25rem)] w-[28%] md:w-[22%] bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 lg:p-5 flex flex-col items-center justify-center text-center z-10 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
              style={{ willChange: 'transform, opacity', maxHeight: '240px' }}
            >
              <div className="w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 lg:mb-3">
                <Leaf className="w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2 lg:mb-3 text-xs lg:text-sm">{features[2].title}</h3>
              <p className="text-[9px] lg:text-[10px] text-gray-300 leading-tight" style={{ maxHeight: '140px', overflow: 'hidden' }}>{features[2].description}</p>
            </div>

            <div
              ref={card4Ref}
              className="absolute right-[calc(42%+2rem)] md:right-[calc(42%+2rem)] top-[calc(12%+11rem+1rem)] md:top-[calc(17%+14rem+1.25rem)] w-[28%] md:w-[22%] bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-4 lg:p-5 flex flex-col items-center justify-center text-center z-10 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-300"
              style={{ willChange: 'transform, opacity', maxHeight: '240px' }}
            >
              <div className="w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 lg:mb-3">
                <Lightbulb className="w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2 lg:mb-3 text-xs lg:text-sm">{features[3].title}</h3>
              <p className="text-[9px] lg:text-[10px] text-gray-300 leading-tight" style={{ maxHeight: '140px', overflow: 'hidden' }}>{features[3].description}</p>
            </div>

            {/* Animated Box */}
            <div
              ref={boxRef}
              className="absolute w-32 md:h-32 border-4 border-gray-400 z-30"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "8px",
                opacity: 0,
              }}
            >
              <div className="w-full h-full bg-green-600/20 backdrop-blur-sm rounded flex items-center justify-center">
                <Leaf className="w-16 md:h-16 text-green-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
