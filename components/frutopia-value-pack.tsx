"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Droplets, Sprout, GraduationCap, Package, DollarSign, Calendar, ArrowUpRight, Leaf, Shield, SprayCan, Sparkles, Truck } from "lucide-react"
import Image from "next/image"

interface ValuePack {
  id: string
  name: string
  fruit: string
  quantity: number
  price: number
  varieties: string[]
  image: string
  maturity: string
}

const valuePacks: ValuePack[] = [
  {
    id: "mango",
    name: "Mango Value Pack",
    fruit: "Grafted Mango Seedlings",
    quantity: 150,
    price: 115000,
    varieties: ["Tommy", "Van Dyke", "Apple", "Kent", "Ngowe"],
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years"
  },
  {
    id: "avocado",
    name: "Avocado Value Pack",
    fruit: "Grafted Avocado Seedlings",
    quantity: 150,
    price: 115000,
    varieties: ["Fuerte", "Hass"],
    image: "https://images.pexels.com/photos/5853834/pexels-photo-5853834.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years"
  },
  {
    id: "pixie-orange",
    name: "Pixie Orange Value Pack",
    fruit: "Grafted Pixie Orange Seedlings",
    quantity: 256,
    price: 175000,
    varieties: ["Pixie Orange"],
    image: "https://images.pexels.com/photos/1435775/pexels-photo-1435775.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years"
  },
  {
    id: "citrus",
    name: "Citrus Value Pack",
    fruit: "Grafted Citrus Seedlings",
    quantity: 256,
    price: 145000,
    varieties: ["Tangerine", "Washington Oranges", "Valencia Oranges", "Green Lemon", "Eureka Lemon", "Lisbon Lemon"],
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years"
  }
]

const includedItems = [
  {
    title: "Button dripper irrigation system",
    icon: Droplets,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/40",
    iconColor: "text-blue-400",
    bgGradient: "bg-gradient-to-br from-blue-600/10 to-cyan-600/10"
  },
  {
    title: "Agronomical nutrition programme",
    icon: Leaf,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-400/40",
    iconColor: "text-green-400",
    bgGradient: "bg-gradient-to-br from-green-600/10 to-emerald-600/10"
  },
  {
    title: "Professional training",
    icon: GraduationCap,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/40",
    iconColor: "text-purple-400",
    bgGradient: "bg-gradient-to-br from-purple-600/10 to-pink-600/10"
  },
  {
    title: "1 knapsack sprayer",
    icon: SprayCan,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-400/40",
    iconColor: "text-orange-400",
    bgGradient: "bg-gradient-to-br from-orange-600/10 to-amber-600/10"
  },
  {
    title: "1 fungicide",
    icon: Shield,
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-400/40",
    iconColor: "text-red-400",
    bgGradient: "bg-gradient-to-br from-red-600/10 to-rose-600/10"
  },
  {
    title: "1 foliar fertilizer",
    icon: Sparkles,
    color: "from-yellow-500/20 to-lime-500/20",
    borderColor: "border-yellow-400/40",
    iconColor: "text-yellow-400",
    bgGradient: "bg-gradient-to-br from-yellow-600/10 to-lime-600/10"
  }
]

const excludedItems = [
  {
    title: "Tank",
    icon: Droplets,
    description: "Water storage tank not included"
  },
  {
    title: "Transportation rates",
    icon: Truck,
    description: "Delivery charges separate"
  }
]

export default function FrutopiaValuePack() {
  const [selectedPack, setSelectedPack] = useState<ValuePack | null>(null)

  const generateWhatsAppMessage = (pack: ValuePack) => {
    const varietiesText = pack.varieties.join(", ")
    const message = `*FRUITOPIA VALUE PACK - ${pack.name.toUpperCase()}*

─────────────────────────

*PACKAGE DETAILS:*
• 1 Acre ${pack.fruit}
• ${pack.quantity} pcs seedlings
• Variety: ${varietiesText}
• Maturity: ${pack.maturity}

*INCLUDED:*
${includedItems.map(item => `✓ ${item.title}`).join("\n")}

*EXCLUDED:*
${excludedItems.map(item => `✗ ${item.title}`).join("\n")}

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
    <section id="frutopia" className="relative py-20 md:py-28 bg-[#07090d] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            FRUITOPIA <span className="font-light text-green-400">VALUE PACK</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            Complete 1-acre farming solutions with premium grafted seedlings and <strong className="text-green-400">precision drip irrigation systems</strong>. Everything you need to start your fruit farming journey.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-green-600/20 border border-green-500/40 rounded-full px-6 py-3">
            <Droplets className="w-6 h-6 text-green-400" />
            <div className="text-left">
              <p className="text-green-300 font-semibold text-sm">Drip Irrigation Kits Included</p>
              <p className="text-gray-300 text-xs">Button dripper system for efficient water management</p>
            </div>
          </div>
        </div>

        {/* Value Pack Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {valuePacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedPack(selectedPack?.id === pack.id ? null : pack)}
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={pack.image}
                  alt={pack.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{pack.name}</h3>
                  <p className="text-green-300 text-sm sm:text-base">{pack.fruit}</p>
                </div>
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {pack.quantity} pcs
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">Varieties:</span>
                    <span className="text-white font-semibold text-sm">{pack.varieties.length} types</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pack.varieties.slice(0, 3).map((variety, idx) => (
                      <span
                        key={idx}
                        className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs border border-green-500/30"
                      >
                        {variety}
                      </span>
                    ))}
                    {pack.varieties.length > 3 && (
                      <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                        +{pack.varieties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Maturity Period</p>
                    <p className="text-white font-semibold">{pack.maturity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm mb-1">Package Price</p>
                    <p className="text-2xl font-bold text-green-400">KES {pack.price.toLocaleString()}</p>
                  </div>
                </div>

                <Link
                  href={`/frutopia/${pack.id}`}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View More
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Information Section */}
        {selectedPack && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 transition-all duration-500 ease-in-out">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - What's Included */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-3 rounded-xl ring-2 ring-green-400/50">
                    <Check className="w-6 h-6 text-green-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">What's Included</h3>
                </div>
                
                {/* Seedlings Card - Special Highlight */}
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-400/40 hover:border-green-400/60 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/30 p-2 rounded-lg flex-shrink-0">
                      <Sprout className="w-5 h-5 text-green-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-1">
                        <span className="text-green-300">{selectedPack.quantity} pcs</span> {selectedPack.fruit.toLowerCase()} of choice
                      </p>
                      <p className="text-gray-300 text-sm">Premium grafted seedlings</p>
                    </div>
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  </div>
                </div>

                {/* Included Items Grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {includedItems.map((item, idx) => {
                    const IconComponent = item.icon
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border-2 ${item.borderColor} ${item.bgGradient} hover:scale-[1.03] transition-all duration-300 group cursor-pointer`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`bg-gradient-to-br ${item.color} p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm leading-snug">{item.title}</p>
                          </div>
                          <Check className={`w-4 h-4 ${item.iconColor} flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column - What's Excluded & Pricing */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-red-600/30 to-orange-600/30 p-3 rounded-xl ring-2 ring-red-400/50">
                    <X className="w-6 h-6 text-red-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">What's Excluded</h3>
                </div>
                
                {/* Excluded Items - Creative Cards */}
                <div className="space-y-3 mb-8">
                  {excludedItems.map((item, idx) => {
                    const IconComponent = item.icon
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-2 border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-700/50 p-2.5 rounded-lg group-hover:bg-gray-600/50 transition-colors duration-300 flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-300 font-medium text-sm mb-1">{item.title}</p>
                            <p className="text-gray-500 text-xs">{item.description}</p>
                          </div>
                          <div className="bg-red-500/20 p-1.5 rounded-full flex-shrink-0">
                            <X className="w-4 h-4 text-red-400" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Payment Plan */}
                <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <h4 className="text-xl font-bold text-white">Payment Plan</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-400">KES {selectedPack.price.toLocaleString()}</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <span className="text-white font-semibold">LIPA POLE POLE</span>
                      </div>
                      <p className="text-green-300 text-sm font-medium">0% INTEREST FOR 90 DAYS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Features Highlight */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm border-2 border-green-500/40 rounded-xl p-5 text-center hover:bg-green-600/30 transition-colors shadow-lg shadow-green-500/20">
            <div className="bg-green-600/40 p-3 rounded-lg w-fit mx-auto mb-3 ring-2 ring-green-400/50">
              <Droplets className="w-6 h-6 text-green-300" />
            </div>
            <h4 className="text-green-300 font-bold mb-2">Drip Irrigation Kits</h4>
            <p className="text-gray-300 text-sm font-medium">Button dripper system included - Professional precision irrigation for optimal growth</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
            <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
              <Sprout className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Premium Seedlings</h4>
            <p className="text-gray-400 text-sm">Professionally grafted and disease-resistant varieties</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
            <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
              <GraduationCap className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Professional Training</h4>
            <p className="text-gray-400 text-sm">Expert guidance and agronomical support included</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
            <div className="bg-green-600/20 p-3 rounded-lg w-fit mx-auto mb-3">
              <Package className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Complete Package</h4>
            <p className="text-gray-400 text-sm">Everything you need to start farming immediately</p>
          </div>
        </div>
      </div>
    </section>
  )
}

