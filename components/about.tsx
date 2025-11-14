"use client"

import { useState } from "react"

export default function About() {
  const [darkMode] = useState(false)

  const features = [
    {
      icon: "🌱",
      title: "Passion in every work",
      description:
        "Professionally grafted and tissue-cultured disease-resistant seedlings for beautiful, sustainable produce.",
    },
    {
      icon: "🤝",
      title: "Collaboration on top",
      description: "Partnering with farmers to share expertise and achieve growing success together.",
    },
    {
      icon: "♻️",
      title: "Sustainability in check",
      description: "Committed to eco-friendly practices that nurture both your crops and the environment.",
    },
    {
      icon: "✨",
      title: "Creativity unleashed",
      description: "Innovative solutions tailored to your unique farming vision and goals.",
    },
  ]

  return (
    <section
      id="about"
      className={`min-h-screen flex items-center justify-center p-4 lg:p-8 ${
        darkMode ? "bg-[#395738]" : "bg-[#2d5044]"
      }`}
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

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-end">
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-12">
              WE ARE DIFFERENT <br /> IN EVERY WAY
            </h1>
            <img
              alt="Fresh strawberries representing quality produce from Mynzagric"
              className="w-full max-w-sm rounded-lg shadow-lg self-start"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-nicola-barts-7937385-oM3XSvfpBdeTl0jQOnIDGyVnW89aZp.jpg"
            />
          </div>

          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-gray-400 rounded-md flex items-center justify-center text-gray-300">
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
