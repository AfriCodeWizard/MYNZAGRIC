import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/structured-data"
import { ArrowLeft, Check, X, Droplets, Sprout, GraduationCap, Package, DollarSign, Calendar, Phone, Mail, Leaf, Shield, SprayCan, Sparkles, Truck } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
    image: "https://images.pexels.com/photos/12940878/pexels-photo-12940878.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/12940878/pexels-photo-12940878.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/4502957/pexels-photo-4502957.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/4502957/pexels-photo-4502957.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/28758681/pexels-photo-28758681.jpeg?auto=compress&cs=tinysrgb&w=800",
    irrigationImage: "https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800",
    fruitImage: "https://images.pexels.com/photos/28758681/pexels-photo-28758681.jpeg?auto=compress&cs=tinysrgb&w=800",
    seedlingImage: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800",
    maturity: "3 years",
    description: "Diversify your citrus production with our comprehensive Citrus Value Pack. Choose from 6 premium varieties including tangerines, oranges, and lemons. This package includes 256 grafted seedlings and a complete button dripper irrigation system for efficient water management across your entire citrus orchard."
  }
}

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const pack = valuePacksData[id]

  if (!pack) {
    return {
      title: "Value Pack Not Found",
    }
  }

  return {
    title: `${pack.name} - Complete 1-Acre Fruit Farming Package | Mynzagric`,
    description: `${pack.description} Includes ${pack.quantity} premium grafted seedlings, button dripper irrigation system, professional training, and agronomical support. Price: KES ${pack.price.toLocaleString()}.`,
    keywords: `${pack.name}, fruit value pack, 1 acre fruit farming, drip irrigation package, ${pack.fruit.toLowerCase()}, complete farming package Kenya`,
    openGraph: {
      title: `${pack.name} - Complete 1-Acre Fruit Farming Package`,
      description: pack.description,
      type: "website",
    },
    alternates: {
      canonical: `/frutopia/${id}`,
    },
  }
}

export default function FrutopiaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const pack = valuePacksData[resolvedParams.id]
  const id = resolvedParams.id

  if (!pack) {
    redirect("/#frutopia")
  }

  const generateWhatsAppMessage = () => {
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
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Frutopia Value Packs", url: "/#frutopia" },
        { name: pack.name, url: `/frutopia/${id}` }
      ]} />
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
                    src="/Drip_irrigation.jpg"
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
                      <span className="text-green-300">{pack.quantity} pcs</span> {pack.fruit.toLowerCase()} of your choice
                    </p>
                    <p className="text-gray-300 text-sm">Premium grafted seedlings</p>
                  </div>
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                </div>
              </div>

              {/* Included Items Grid */}
              <div className="grid sm:grid-cols-1 gap-3">
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

            {/* Excluded */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-red-600/30 to-orange-600/30 p-3 rounded-xl ring-2 ring-red-400/50">
                  <X className="w-6 h-6 text-red-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">What's Excluded</h3>
              </div>
              
              {/* Excluded Items - Creative Cards */}
              <div className="space-y-3">
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
            </div>
          </div>

          {/* Drip Irrigation Highlight - CodePen Design */}
          <div className="mb-8 drip-irrigation-card" style={{ filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5))' }}>
            <div className="drip-irrigation-grid">
              {/* Text Section */}
              <div className="drip-text-section flex flex-col">
                <div className="text-xs sm:text-sm text-green-400 font-semibold uppercase tracking-wider mb-2">
                  Drip Irrigation
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-green-300 italic mb-3">
                  Precision Drip Irrigation System Included
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Our button dripper irrigation system is designed for maximum water efficiency and optimal plant growth. This professional-grade system ensures:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Precise water delivery directly to plant roots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Reduced water waste and lower operational costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Professional installation guidance included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Compatible with all modern water sources</span>
                  </li>
                </ul>
              </div>

              {/* Image Section - 3 images horizontally with diagonal edges */}
              {[
                'https://images.pexels.com/photos/4061662/pexels-photo-4061662.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80'
              ].map((imgSrc, idx) => (
                <figure key={idx} className="drip-image-wrapper">
                  <Image
                    src={imgSrc}
                    alt={`Drip irrigation system ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </figure>
              ))}
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
                href="mailto:MYNZAGRIC@gmail.com"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  )
}

