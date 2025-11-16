"use client"

import { Heart, PenTool, Leaf, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function About() {
  const imageRef = useRef<HTMLImageElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number | null>(null)
  const features = [
    {
      icon: Heart,
      title: "Passion in every work",
      description:
        "Professionally grafted and tissue-cultured disease-resistant seedlings for beautiful, sustainable produce. Our team brings years of expertise and genuine care to every seedling we cultivate, ensuring the highest quality standards from selection to delivery.",
    },
    {
      icon: PenTool,
      title: "Collaboration on top",
      description: "Partnering with farmers to share expertise and achieve growing success together. We work closely with agricultural communities, providing personalized guidance, technical support, and innovative solutions that help transform farming operations into thriving enterprises.",
    },
    {
      icon: Leaf,
      title: "Sustainability in check",
      description: "Committed to eco-friendly practices that nurture both your crops and the environment. Our sustainable farming methods protect soil health, conserve water resources, and promote biodiversity while delivering exceptional yields that benefit both farmers and the planet.",
    },
    {
      icon: Lightbulb,
      title: "Creativity unleashed",
      description: "Innovative solutions tailored to your unique farming vision and goals. We combine cutting-edge agricultural technology with traditional wisdom, creating customized approaches that maximize productivity, efficiency, and profitability for each farming operation.",
    },
  ]

  useEffect(() => {
    const updateHeight = () => {
      if (imageRef.current && featuresRef.current) {
        const imageHeight = imageRef.current.offsetHeight
        setMaxHeight(imageHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    const image = imageRef.current
    if (image) {
      image.addEventListener('load', updateHeight)
    }

    return () => {
      window.removeEventListener('resize', updateHeight)
      if (image) {
        image.removeEventListener('load', updateHeight)
      }
    }
  }, [])

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-gradient-to-b from-green-900 to-green-950"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            WE ARE <span className="font-light text-gray-300">DIFFERENT</span>
            <br />& IN EVERY WAY
          </h2>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          <div className="flex flex-col lg:self-start">
            <img
              ref={imageRef}
              alt="Seedlings in plant nursery trays representing quality produce from Mynzagric"
              className="w-full max-w-sm rounded-lg shadow-lg"
              src="https://images.pexels.com/photos/32873207/pexels-photo-32873207.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>

          <div 
            ref={featuresRef}
            className="flex flex-col lg:self-start"
            style={maxHeight ? { height: `${maxHeight}px`, maxHeight: `${maxHeight}px`, overflow: 'hidden' } : {}}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 h-full">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex space-x-4 h-full">
                    <div className="flex-shrink-0 w-12 h-12 border border-gray-400 rounded-md flex items-start justify-center text-white bg-transparent pt-2">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 flex flex-col h-full justify-between">
                      <h3 className="font-semibold text-white mb-3 text-sm lg:text-base">{feature.title}</h3>
                      <p className="text-xs lg:text-sm text-gray-300 leading-relaxed flex-1">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default About
