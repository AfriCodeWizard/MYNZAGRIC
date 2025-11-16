"use client"

import { CheckCircle, Truck, Award, Sprout } from "lucide-react"

export default function CareGuides() {
  const reasons = [
    {
      icon: Sprout,
      title: "Premium Quality Seedlings",
      description:
        "Disease-resistant, professionally grafted and tissue-cultured seedlings that ensure healthy growth and maximum productivity.",
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description:
        "Fast and secure delivery across Kenya with proper packaging to ensure your seedlings arrive in perfect condition.",
    },
    {
      icon: Award,
      title: "Expert Support",
      description:
        "Access to our team of agricultural experts for guidance on planting, care, and maximizing your harvest yield.",
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Guarantee",
      description: "Quality-assured seedlings with a commitment to your farming success and long-term partnership.",
    },
  ]

  return (
    <section id="care-guides" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-green-50 to-white">
      {/* Background Image with 50% opacity - Sticky */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://images.pexels.com/photos/32209937/pexels-photo-32209937.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.5,
        }}
      />
      
      {/* Light Gradient Overlay for text readability - minimal opacity */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/20 to-white/30" />
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            WHY CHOOSE <span className="font-light text-gray-500">MYNZAGRIC</span>
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by farmers across Kenya for premium fruit seedlings and agricultural expertise
          </p>
        </div>

        {/* Grid of reasons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-green-100 hover:border-green-400 hover:shadow-lg transition group backdrop-blur-sm"
              >
                <div className="mb-4 p-4 bg-green-50 rounded-lg w-fit group-hover:bg-green-100 transition">
                  <Icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
