"use client"

import { useState } from "react"
import { Heart, PenTool, Leaf, Lightbulb } from "lucide-react"

export default function About() {
  const [darkMode] = useState(false)

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

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-b from-green-900 to-green-950"
    >
      <div className="max-w-7xl w-full mx-auto">
        <header className="flex justify-between items-start mb-16">
          <div className="text-sm font-semibold tracking-widest text-gray-400">[ VALUES ]</div>
          <nav className="text-right">
            <ul className="space-y-4">
              <li>
                <a
                  className="group text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  href="#"
                >
                  <div className="flex items-center justify-end space-x-4">
                    <span className="font-medium">Premium Seedlings</span>
                  </div>
                  <div className="h-px bg-gray-500 mt-2 group-hover:bg-white transition-colors duration-300"></div>
                </a>
              </li>
              <li>
                <a
                  className="group text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  href="#"
                >
                  <div className="flex items-center justify-end space-x-4">
                    <span className="font-medium">Organic Farming</span>
                  </div>
                  <div className="h-px bg-gray-500 mt-2 group-hover:bg-white transition-colors duration-300"></div>
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-12">
              WE ARE <span className="font-light text-gray-300">DIFFERENT</span>
              <br />& IN EVERY WAY
            </h1>
            <img
              alt="Seedlings in plant nursery trays representing quality produce from Mynzagric"
              className="w-full max-w-sm rounded-lg shadow-lg self-start"
              src="https://images.pexels.com/photos/32873207/pexels-photo-32873207.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </div>

          <div className="flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 border border-gray-400 rounded-md flex items-center justify-center text-white bg-transparent">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-3 text-base lg:text-lg">{feature.title}</h3>
                      <p className="text-sm lg:text-base text-gray-300 leading-relaxed">{feature.description}</p>
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
