"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { seedlings } from "@/lib/seedlings-data"
import { useCart } from "@/contexts/cart-context"
import { BreadcrumbSchema } from "@/components/structured-data"
import { 
  Flower2, 
  Sprout, 
  Trees, 
  Palette, 
  Droplet, 
  Sun, 
  Leaf, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FlowersLandscapesPage() {
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState<"flowers" | "services">("flowers")
  
  // Filter flower seedlings
  const flowerSeedlings = seedlings.filter(s => s.category === "flowers")

  const landscapingServices = [
    {
      id: "residential",
      title: "Residential Landscaping",
      icon: "🏡",
      description: "Transform your home into a blooming paradise with custom-designed gardens, flower beds, and outdoor living spaces.",
      features: [
        "Custom garden design & installation",
        "Flower bed planning & planting",
        "Lawn installation & maintenance",
        "Outdoor lighting & irrigation",
        "Seasonal flower arrangements",
        "Garden maintenance services"
      ],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: "commercial",
      title: "Commercial Landscaping",
      icon: "🏢",
      description: "Create stunning first impressions for your business with professional landscaping that reflects your brand.",
      features: [
        "Corporate garden design",
        "Entrance & pathway landscaping",
        "Parking lot beautification",
        "Maintenance contracts",
        "Seasonal flower displays",
        "Sustainable landscape solutions"
      ],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: "event",
      title: "Event & Wedding Landscaping",
      icon: "💐",
      description: "Make your special day unforgettable with breathtaking floral arrangements and event landscaping.",
      features: [
        "Wedding venue decoration",
        "Floral archways & centerpieces",
        "Event garden setup",
        "Photo backdrop installations",
        "Temporary landscape features",
        "Post-event cleanup"
      ],
      image: "https://images.unsplash.com/photo-1519167758481-83f29da2c1fe?w=800&q=80&auto=format&fit=crop"
    },
    {
      id: "maintenance",
      title: "Garden Maintenance Services",
      icon: "🌱",
      description: "Keep your landscape beautiful year-round with our professional maintenance and care services.",
      features: [
        "Weekly/monthly maintenance plans",
        "Pruning & trimming services",
        "Fertilization & pest control",
        "Irrigation system maintenance",
        "Seasonal replanting",
        "Garden health assessments"
      ],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop"
    }
  ]

  const designProcess = [
    {
      step: "01",
      title: "Consultation",
      description: "We visit your space, understand your vision, and discuss your preferences, budget, and timeline."
    },
    {
      step: "02",
      title: "Design Proposal",
      description: "Receive a detailed 3D design plan with plant selections, layout, and cost estimates."
    },
    {
      step: "03",
      title: "Installation",
      description: "Our expert team brings the design to life with professional installation and planting."
    },
    {
      step: "04",
      title: "Maintenance",
      description: "Ongoing care and support to ensure your landscape thrives and stays beautiful."
    }
  ]

  const generateLandscapingMessage = (service: typeof landscapingServices[0]) => {
    const message = `*LANDSCAPING SERVICE INQUIRY*

─────────────────────────

*SERVICE:*
${service.title}

*SERVICE DETAILS:*
${service.description}

*FEATURES:*
${service.features.map(f => `• ${f}`).join('\n')}

*PRICING:*
Price to be communicated upon order request

─────────────────────────

I'm interested in this landscaping service. Please provide more details and schedule a consultation.

Thank you!`
    return encodeURIComponent(message)
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Flowers & Landscaping", url: "/flowers-landscapes" }
      ]} />
      <div className="min-h-screen bg-[#0e0e0e]">
        <Navbar />
      
      {/* Hero Section with Flower Theme */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image with Full Coverage */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, backgroundColor: "#000000" }}>
          <Image
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&q=80&auto=format&fit=crop"
            alt="Beautiful dream landscape garden with flowers"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark Overlay - Radial gradient: lighter center, darker edges - matching main hero */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.85) 100%)',
            zIndex: 1
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Bloom Your
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Dream Landscape
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mt-6 max-w-4xl mx-auto font-light leading-relaxed">
              Premium flower seedlings & professional landscaping services to transform any space into a vibrant paradise
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-20 z-40 bg-[#0e0e0e] border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-4">
            <button
              onClick={() => setActiveTab("flowers")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "flowers"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white bg-white/5"
              }`}
            >
              <Flower2 className="w-5 h-5" />
              Flower Seedlings
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "services"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white bg-white/5"
              }`}
            >
              <Trees className="w-5 h-5" />
              Landscaping Services
            </button>
          </div>
        </div>
      </section>

      {/* Flower Seedlings Section */}
      {activeTab === "flowers" && (
        <section id="products" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-500/10 rounded-full border border-pink-500/20">
                <Sprout className="w-5 h-5 text-pink-400" />
                <span className="text-pink-400 text-sm font-medium">Premium Quality</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Premium <span className="text-pink-400">Flower Seedlings</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform your garden with our premium flower seedlings. Each plant is carefully nurtured for vibrant blooms and healthy growth.
              </p>
            </div>

            {/* Flower Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {flowerSeedlings.map((seedling) => (
                <div key={seedling.id} className="group">
                  <ProductCard
                    seedling={seedling}
                    onAddToCart={addToCart}
                    showAddToCart={true}
                  />
                </div>
              ))}
            </div>

            {/* Why Choose Our Flowers */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Premium Quality</h3>
                <p className="text-gray-300 leading-relaxed">
                  All our flower seedlings are carefully selected and nurtured for optimal health and vibrant blooms.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Expert Care Guides</h3>
                <p className="text-gray-300 leading-relaxed">
                  Comprehensive care instructions included with every purchase to ensure your flowers thrive.
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Year-Round Blooms</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our selection includes varieties that provide continuous blooms throughout the seasons.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Landscaping Services Section */}
      {activeTab === "services" && (
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                <Palette className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Professional Services</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Landscaping <span className="text-green-400">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From design to installation to maintenance, we offer comprehensive landscaping solutions to bring your vision to life.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {landscapingServices.map((service) => (
                <div
                  key={service.id}
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-3xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end pt-6 border-t border-white/10">
                      <a
                        href={`https://wa.me/254713764658?text=${generateLandscapingMessage(service)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Inquire Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Design Process */}
            <div className="mt-20">
              <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
                Our Design <span className="text-green-400">Process</span>
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {designProcess.map((process, idx) => (
                  <div
                    key={idx}
                    className="relative bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300"
                  >
                    <div className="text-5xl font-bold text-green-400/30 mb-4">{process.step}</div>
                    <h4 className="text-xl font-bold text-white mb-3">{process.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{process.description}</p>
                    {idx < designProcess.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-green-500/50 transform -translate-y-1/2">
                        <ArrowRight className="w-4 h-4 text-green-500 absolute -right-1 -top-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Our Services */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Custom Designs</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every landscape is uniquely designed to match your style, space, and vision.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                  <Droplet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Sustainable Solutions</h3>
                <p className="text-gray-300 leading-relaxed">
                  Eco-friendly practices and water-efficient irrigation systems for sustainable landscapes.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Expert Team</h3>
                <p className="text-gray-300 leading-relaxed">
                  Certified landscapers with years of experience creating stunning outdoor spaces.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-green-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to <span className="bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent">Transform Your Space?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Get in touch with our team to discuss your flower and landscaping needs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/254713764658"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="mailto:mynzagric@gmail.com"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
            <a
              href="tel:+254713764658"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  )
}

