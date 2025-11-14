"use client"
import { use } from "react"
import { seedlings } from "@/lib/seedlings-data"
import {
  ArrowLeft,
  Droplet,
  Sun,
  Leaf,
  Thermometer,
  Zap,
  Ruler,
  Clock,
  Bug,
  ShoppingCart,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function PlantCarePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const seedling = seedlings.find((s) => s.id === id)

  if (!seedling) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/#seedlings"
            className="flex items-center gap-2 text-green-700 hover:text-green-800 mb-8 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Seedlings
          </Link>
          <p className="text-gray-600">Seedling not found</p>
        </div>
      </div>
    )
  }

  const care = seedling.careGuide

  const careItems = [
    {
      key: "watering",
      label: "Watering",
      icon: Droplet,
      iconColor: "text-blue-600",
      content: care?.watering,
    },
    {
      key: "sunlight",
      label: "Sunlight",
      icon: Sun,
      iconColor: "text-yellow-600",
      content: care?.sunlight,
    },
    {
      key: "soil",
      label: "Soil Requirements",
      icon: Leaf,
      iconColor: "text-green-600",
      content: care?.soil,
    },
    {
      key: "temperature",
      label: "Temperature",
      icon: Thermometer,
      iconColor: "text-red-600",
      content: care?.temperature,
    },
    {
      key: "fertilizer",
      label: "Fertilizer",
      icon: Zap,
      iconColor: "text-purple-600",
      content: care?.fertilizer,
    },
    {
      key: "spacing",
      label: "Spacing",
      icon: Ruler,
      iconColor: "text-indigo-600",
      content: care?.spacing,
    },
    {
      key: "timeToFruit",
      label: "Time to Fruit",
      icon: Clock,
      iconColor: "text-orange-600",
      content: care?.timeToFruit,
    },
    {
      key: "pests",
      label: "Pest & Disease Management",
      icon: Bug,
      iconColor: "text-rose-600",
      content: care?.pests,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="bg-primary text-white sticky top-0 z-50 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/#seedlings"
            className="flex items-center gap-2 text-white/80 hover:text-white transition font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Seedlings
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Icon */}
            <div className="flex justify-center md:justify-start">
              <div className="text-9xl drop-shadow-lg">{seedling.icon}</div>
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{seedling.name}</h1>
              <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-2xl">
                Complete care guide for premium {seedling.category} seedling. Follow these instructions for optimal
                growth and maximum yield.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <p className="text-white/70 text-sm">Category</p>
                  <p className="text-2xl font-bold capitalize">{seedling.category}</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <p className="text-white/70 text-sm">Price</p>
                  <p className="text-2xl font-bold">KES {seedling.price}</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <p className="text-white/70 text-sm">Time to Fruit</p>
                  <p className="text-2xl font-bold">12-18 Mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {care && (
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Complete Care Guide Section */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Complete <span className="text-primary">Care Guide</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-3xl">
              Detailed care instructions for growing your {seedling.name} seedling successfully
            </p>

            {/* Care Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.key}
                    className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-secondary ${item.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">{item.label}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{item.content}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-20 bg-card rounded-2xl p-12 border border-border shadow-sm">
            <h2 className="text-4xl font-bold text-foreground mb-12">
              Growing <span className="text-primary">Timeline</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-secondary rounded-xl p-6 border-l-4 border-primary">
                <p className="text-xs font-bold text-primary uppercase mb-3">Phase 1</p>
                <h3 className="text-lg font-bold text-foreground mb-2">Planting</h3>
                <p className="text-muted-foreground text-sm">Prepare soil, plant seedling, water thoroughly</p>
              </div>
              <div className="bg-secondary rounded-xl p-6 border-l-4 border-primary">
                <p className="text-xs font-bold text-primary uppercase mb-3">Phase 2</p>
                <h3 className="text-lg font-bold text-foreground mb-2">Establishment</h3>
                <p className="text-muted-foreground text-sm">Regular watering, fertilizer application</p>
              </div>
              <div className="bg-secondary rounded-xl p-6 border-l-4 border-primary">
                <p className="text-xs font-bold text-primary uppercase mb-3">Phase 3</p>
                <h3 className="text-lg font-bold text-foreground mb-2">Growth</h3>
                <p className="text-muted-foreground text-sm">Pruning, maintenance, pest management</p>
              </div>
              <div className="bg-secondary rounded-xl p-6 border-l-4 border-primary">
                <p className="text-xs font-bold text-primary uppercase mb-3">Phase 4</p>
                <h3 className="text-lg font-bold text-foreground mb-2">Fruiting</h3>
                <p className="text-muted-foreground text-sm">Harvest and ongoing maintenance</p>
              </div>
            </div>
          </div>

          {/* Common Issues Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground mb-12">
              Common <span className="text-primary">Issues & Solutions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Yellow Leaves</h3>
                    <p className="text-muted-foreground text-sm">
                      Often indicates nutrient deficiency or overwatering. Check soil moisture and apply balanced
                      fertilizer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Pest Infestation</h3>
                    <p className="text-muted-foreground text-sm">
                      Use neem oil spray and maintain good sanitation. Remove affected leaves and isolate if necessary.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Slow Growth</h3>
                    <p className="text-muted-foreground text-sm">
                      Ensure adequate sunlight (6+ hours daily) and apply growth-promoting fertilizer monthly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No Fruiting</h3>
                    <p className="text-muted-foreground text-sm">
                      Wait for plant maturity, adjust temperature if needed, and apply potassium-rich fertilizer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reference Box */}
          <div className="bg-secondary rounded-2xl p-8 border border-primary/30 mb-20">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Reference</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Min Temperature</p>
                <p className="text-3xl font-bold text-primary">10°C</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Ideal Sunlight</p>
                <p className="text-3xl font-bold text-primary">6+ hrs</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Water Frequency</p>
                <p className="text-3xl font-bold text-primary">Regular</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Soil pH</p>
                <p className="text-3xl font-bold text-primary">6.0-7.0</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="flex-1 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Ready to start growing?</h3>
              <p className="text-white/80 text-lg">
                Order this premium {seedling.name} seedling today and begin your agricultural success story
              </p>
            </div>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-primary rounded-xl hover:bg-secondary transition font-bold text-lg whitespace-nowrap shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
