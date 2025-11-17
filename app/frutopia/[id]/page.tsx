"use client"

import { use, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, X, Droplets, Sprout, GraduationCap, Package, DollarSign, Calendar, Phone, Mail } from "lucide-react"
import Navbar from "@/components/navbar"

interface ValuePackDetail {
  id: string
  name: string
  fruit: string
  quantity: number
  price: number
  varieties: string[]
  image: string
  maturity: string
  description: string
  irrigationImage: string
  fruitImage: string
  seedlingImage: string
}

const valuePacksData: Record<string, ValuePackDetail> = {
  mango: {
    id: "mango",
    name: "Mango Value Pack",
    fruit: "Grafted Mango Seedlings",
    quantity: 150,
    price: 115000,
    varieties: ["Tommy", "Van Dyke", "Apple", "Kent", "Ngowe"],
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800",
    seedlingImage: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years",
    description: "Transform your 1-acre land into a thriving mango orchard with our comprehensive Mango Value Pack. This complete package includes 150 premium grafted mango seedlings of your choice, along with a professional button dripper irrigation system designed for optimal water efficiency and maximum yield."
  },
  avocado: {
    id: "avocado",
    name: "Avocado Value Pack",
    fruit: "Grafted Avocado Seedlings",
    quantity: 150,
    price: 115000,
    varieties: ["Fuerte", "Hass"],
    image: "https://images.pexels.com/photos/5853834/pexels-photo-5853834.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/5853834/pexels-photo-5853834.jpeg?auto=compress&cs=tinysrgb&w=800",
    seedlingImage: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years",
    description: "Start your avocado farming journey with our complete Avocado Value Pack. This 1-acre solution includes 150 premium grafted avocado seedlings (Fuerte or Hass varieties) and a state-of-the-art button dripper irrigation system. Perfect for commercial farming with professional support included."
  },
  "pixie-orange": {
    id: "pixie-orange",
    name: "Pixie Orange Value Pack",
    fruit: "Grafted Pixie Orange Seedlings",
    quantity: 256,
    price: 175000,
    varieties: ["Pixie Orange"],
    image: "https://images.pexels.com/photos/1435775/pexels-photo-1435775.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/1435775/pexels-photo-1435775.jpeg?auto=compress&cs=tinysrgb&w=800",
    seedlingImage: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years",
    description: "The Pixie Orange Value Pack offers the highest density planting with 256 premium grafted Pixie Orange seedlings per acre. Combined with our precision button dripper irrigation system, this package ensures maximum productivity and efficient water usage for your citrus orchard."
  },
  citrus: {
    id: "citrus",
    name: "Citrus Value Pack",
    fruit: "Grafted Citrus Seedlings",
    quantity: 256,
    price: 145000,
    varieties: ["Tangerine", "Washington Oranges", "Valencia Oranges", "Green Lemon", "Eureka Lemon", "Lisbon Lemon"],
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800",
    seedlingImage: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years",
    description: "Diversify your citrus production with our comprehensive Citrus Value Pack. Choose from 6 premium varieties including tangerines, oranges, and lemons. This package includes 256 grafted seedlings and a complete button dripper irrigation system for efficient water management across your entire citrus orchard."
  }
}

const includedItems = [
  "Button dripper irrigation system",
  "Agronomical nutrition programme",
  "Professional training",
  "1 knapsack sprayer",
  "1 fungicide",
  "1 foliar fertilizer"
]

const excludedItems = [
  "Tank",
  "Transportation rates"
]

export default function FrutopiaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const pack = valuePacksData[resolvedParams.id]

  useEffect(() => {
    if (!pack) {
      window.location.href = "/#frutopia"
    }
  }, [pack])

  if (!pack) {
    return null
  }

  const generateWhatsAppMessage = () => {
    const varietiesText = pack.varieties.join(", ")
    const message = `*FRUTOPIA VALUE PACK - ${pack.name.toUpperCase()}*

─────────────────────────

*PACKAGE DETAILS:*
• 1 Acre ${pack.fruit}
• ${pack.quantity} pcs seedlings
• Variety: ${varietiesText}
• Maturity: ${pack.maturity}

*INCLUDED:*
${includedItems.map(item => `✓ ${item}`).join("\n")}

*EXCLUDED:*
${excludedItems.map(item => `✗ ${item}`).join("\n")}

*PRICING:*
Amount: KES ${pack.price.toLocaleString()}
Payment Plan: LIPA POLE POLE
0% INTEREST FOR 90 DAYS

─────────────────────────

I'm interested in this package. Please provide more details.

Thank you!`
    
    return encodeURIComponent(message)
  }

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      
      <section className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/#frutopia"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Value Packs</span>
          </Link>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Left - Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={pack.fruitImage}
                  alt={pack.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden">
                  <Image
                    src={pack.irrigationImage}
                    alt="Drip Irrigation System"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-semibold">Drip Irrigation</p>
                  </div>
                </div>
                <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden">
                  <Image
                    src={pack.seedlingImage}
                    alt="Seedlings"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-semibold">Premium Seedlings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {pack.name}
              </h1>
              <p className="text-green-400 text-lg sm:text-xl mb-6">
                {pack.fruit} • {pack.quantity} pcs • {pack.maturity} maturity
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 text-base sm:text-lg">
                {pack.description}
              </p>

              {/* Price Box */}
              <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 border-2 border-green-500/40 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 text-lg">Package Price:</span>
                  <span className="text-4xl font-bold text-green-400">KES {pack.price.toLocaleString()}</span>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">LIPA POLE POLE</span>
                  </div>
                  <p className="text-green-300 text-sm font-medium">0% INTEREST FOR 90 DAYS</p>
                </div>
                <a
                  href={`https://wa.me/254713764658?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Phone className="w-5 h-5" />
                  Order This Package
                </a>
              </div>
            </div>
          </div>

          {/* Varieties Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Sprout className="w-6 h-6 text-green-400" />
              Available Varieties
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pack.varieties.map((variety, idx) => (
                <div
                  key={idx}
                  className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 hover:bg-green-600/30 transition-colors"
                >
                  <p className="text-green-300 font-semibold">{variety}</p>
                  <p className="text-gray-400 text-sm mt-1">Premium grafted variety</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included & Excluded */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* Included */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-600/20 p-2 rounded-lg">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">What's Included</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">{pack.quantity} pcs</strong> {pack.fruit.toLowerCase()} of your choice
                  </span>
                </li>
                {includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600/20 p-2 rounded-lg">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">What's Excluded</h3>
              </div>
              <ul className="space-y-4">
                {excludedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Drip Irrigation Highlight */}
          <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 border-2 border-green-500/40 rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="bg-green-600/40 p-4 rounded-xl ring-2 ring-green-400/50 flex-shrink-0">
                <Droplets className="w-8 h-8 text-green-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-green-300 mb-3">
                  Precision Drip Irrigation System Included
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4 text-base sm:text-lg">
                  Our button dripper irrigation system is designed for maximum water efficiency and optimal plant growth. This professional-grade system ensures:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Precise water delivery directly to plant roots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Reduced water waste and lower operational costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Professional installation guidance included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Compatible with all modern water sources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Package Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
              <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
                <Package className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Complete Package</h4>
              <p className="text-gray-400 text-sm">Everything you need to start farming immediately</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
              <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Professional Training</h4>
              <p className="text-gray-400 text-sm">Expert guidance and agronomical support</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
              <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
                <Sprout className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Premium Quality</h4>
              <p className="text-gray-400 text-sm">Disease-resistant grafted seedlings</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
              <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Flexible Payment</h4>
              <p className="text-gray-400 text-sm">0% interest for 90 days</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600/10 to-green-700/10 border border-green-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Farming Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get in touch with us to learn more about this package and start your order today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/254713764658?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Order via WhatsApp
              </a>
              <a
                href="mailto:Mynzagric@gmail.com"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

