"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Leaf, Droplet, TrendingUp, Users, CheckCircle2, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { successStories } from "@/lib/success-stories"

export default function ImpactPage() {
  const impactStats = [
    {
      number: "251,160",
      label: "CO₂ saved annually",
      icon: Leaf,
      color: "text-green-400"
    },
    {
      number: "12,960",
      label: "Lives impacted indirectly",
      icon: Users,
      color: "text-blue-400"
    },
    {
      number: "$666",
      label: "Additional income per year / farmer (33% increase)",
      icon: TrendingUp,
      color: "text-yellow-400"
    },
    {
      number: "9.6M",
      label: "Cubic liters of water saved",
      icon: Droplet,
      color: "text-cyan-400"
    }
  ]

  const impactCategories = [
    {
      title: "Environmental Impact",
      description: "Preventing floods and droughts through climate smart irrigation solutions. Solar powered pumps saves CO₂ from entering the environment.",
      icon: Leaf,
      gradient: "from-green-600 to-emerald-700"
    },
    {
      title: "Economical Impact",
      description: "Elevating farmers out of poverty by providing them additional annual income increase (Profit) of 33%.",
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      title: "Social Impact",
      description: "With enhanced technical knowledge and skills, money directly goes in the hands of women and youth through job creation. These are the two most vulnerable groups that become climate champions and decision makers within the farms.",
      icon: Users,
      gradient: "from-blue-500 to-indigo-600"
    }
  ]


  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop"
          alt="Climate smart farming impact - Fruit orchard farm"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/70 to-[#07090d]/40" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Impacting the world day by day with{" "}
              <span className="text-green-400">climate smart farming</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mt-6 max-w-4xl mx-auto font-light">
              Changing lives of every small holder farmer
            </p>
          </div>
        </div>
      </section>

      {/* Impact Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {impactCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-green-900/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Impact to Date
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Our Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Link
                key={story.id}
                href={`/impact/stories/${story.slug}`}
                className="group block"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 h-full flex flex-col">
                  {/* Creative Image Section with Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                      {story.type}
                    </div>
                    {/* Location Badge */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {story.location}
                    </div>
                    {/* Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        {story.name}
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                      {story.shortDescription}
                    </p>
                    
                    {/* Read More Button with Animation */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-green-400 hover:text-green-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      {/* Decorative Element */}
                      <div className="w-8 h-0.5 bg-green-400 group-hover:w-12 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600/10 to-green-700/10 border border-green-500/30 rounded-2xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get in touch with us to kick start your farming Journey the{" "}
              <span className="text-green-400">Climate smart way</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of farmers transforming their lives through sustainable agriculture
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

