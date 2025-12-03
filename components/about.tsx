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
  const blockquoteRef = useRef<HTMLBlockquoteElement>(null)
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

      // Create timeline for scroll animations
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

          // Animate cards 3 & 4 (smaller, background - like building image)
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

          // Create ScrollTrigger for sticky section - all animations tied to scroll
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
      description: "Professionally grafted and tissue-cultured disease-resistant seedlings for beautiful, sustainable produce.",
    },
    {
      icon: PenTool,
      title: "Collaboration on top",
      description: "Partnering with farmers to share expertise and achieve growing success together.",
    },
    {
      icon: Leaf,
      title: "Sustainability in check",
      description: "Committed to eco-friendly practices that nurture both your crops and the environment.",
    },
    {
      icon: Lightbulb,
      title: "Creativity unleashed",
      description: "Innovative solutions tailored to your unique farming vision and goals.",
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
        className="sticky-container relative h-screen w-full"
      >
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative about-container"
        >
          {/* WE ARE DIFFERENT Heading */}
          <blockquote
            ref={blockquoteRef}
            className="absolute text-3xl md:text-4xl lg:text-5xl font-bold text-white w-full md:w-[40%] lg:w-[35%] mt-[15%] md:mt-[17%] z-10 left-4 sm:left-6 lg:left-8"
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
            className="absolute right-4 sm:right-6 lg:right-8 top-[20%] w-[19%] md:w-[19.5%] aspect-square bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex flex-col items-center justify-center text-center z-20"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 md:mb-2 lg:mb-3">
              <Heart className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
            <h3 className="font-semibold text-white mb-1 md:mb-1 lg:mb-2 text-[10px] md:text-xs lg:text-sm">{features[0].title}</h3>
            <p className="text-[9px] md:text-[10px] lg:text-xs text-gray-300 leading-tight">{features[0].description}</p>
          </div>

          <div
            ref={card2Ref}
            data-card="2"
            className="absolute top-[20%] w-[19%] md:w-[19.5%] aspect-square bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex flex-col items-center justify-center text-center z-20"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 md:mb-2 lg:mb-3">
              <PenTool className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
            <h3 className="font-semibold text-white mb-1 md:mb-1 lg:mb-2 text-[10px] md:text-xs lg:text-sm">{features[1].title}</h3>
            <p className="text-[9px] md:text-[10px] lg:text-xs text-gray-300 leading-tight">{features[1].description}</p>
          </div>

          {/* Cards 3 & 4 - Replace building image (smaller, background, below heading line) - Side by side with consistent spacing matching right cards */}
          <div
            ref={card3Ref}
            className="absolute right-[calc(42%+19%+0.5%)] md:right-[calc(42%+19%+0.5%)] top-[calc(15%+13rem+1.25rem)] md:top-[calc(17%+14rem+1.25rem)] w-[18%] md:w-[19%] aspect-square bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex flex-col items-center justify-center text-center z-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 md:mb-2 lg:mb-3">
              <Leaf className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
            <h3 className="font-semibold text-white mb-1 md:mb-1 lg:mb-2 text-[10px] md:text-xs lg:text-sm">{features[2].title}</h3>
            <p className="text-[9px] md:text-[10px] lg:text-xs text-gray-300 leading-tight">{features[2].description}</p>
          </div>

          <div
            ref={card4Ref}
            className="absolute right-[42%] md:right-[42%] top-[calc(15%+13rem+1.25rem)] md:top-[calc(17%+14rem+1.25rem)] w-[18%] md:w-[19%] aspect-square bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex flex-col items-center justify-center text-center z-10"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-green-400 rounded-md flex items-center justify-center text-green-400 bg-green-400/10 mb-2 md:mb-2 lg:mb-3">
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
            <h3 className="font-semibold text-white mb-1 md:mb-1 lg:mb-2 text-[10px] md:text-xs lg:text-sm">{features[3].title}</h3>
            <p className="text-[9px] md:text-[10px] lg:text-xs text-gray-300 leading-tight">{features[3].description}</p>
          </div>

          {/* Animated Box */}
          <div
            ref={boxRef}
            className="absolute w-24 h-24 md:w-32 md:h-32 border-4 border-gray-400 z-30"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "8px",
              opacity: 0,
            }}
          >
            <div className="w-full h-full bg-green-600/20 backdrop-blur-sm rounded flex items-center justify-center">
              <Leaf className="w-12 h-12 md:w-16 md:h-16 text-green-400" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
