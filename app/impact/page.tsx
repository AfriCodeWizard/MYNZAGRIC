"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Leaf, Droplet, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

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

  const successStories = [
    {
      name: "Jackline Mwangi",
      type: "Case Study",
      description: "Upon acquiring our solar irrigation kit for her venture with the savings she had made, we facilitated connections with buyers willing to offer competitive rates for her strawberry produce. This enabled her to generate sufficient income to support her family in Uganda, and the surplus was reinvested, expanding her business to half an acre.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
    },
    {
      name: "Kavita Ndolo",
      type: "Case Study",
      description: "To address the water scarcity issue, Kavita implemented strategic measures. He installed solar-powered pumps, acquired a dam liner for efficient water storage, and invested in our irrigation systems from specifically designed for growing fruits and vegetables.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
    },
    {
      name: "Shanzu Farmer Group",
      type: "Case Study",
      description: "The Mombasa County government, in collaboration with the Swedish embassy, approached us to customize a solar-powered pump. This innovative solution was designed to draw water closer to the women's homes, alleviating the need for the strenuous journey to fetch water. Consequently, the women could redirect their energy and time towards tending to their farms, while the children had ample time and energy to focus on their studies.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e41bcc6?w=400&q=80"
    }
  ]

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Impacting the world day by day with{" "}
            <span className="text-green-400">climate smart farming</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mt-6 max-w-3xl mx-auto">
            Changing lives of every small holder farmer
          </p>
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
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-800/20" />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {story.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    {story.name}
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {story.description}
                  </p>
                  <button className="text-green-400 hover:text-green-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
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

