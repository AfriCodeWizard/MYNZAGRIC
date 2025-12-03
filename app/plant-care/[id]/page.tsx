"use client"
import { use } from "react"
import Link from "next/link"
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
  ShoppingBag,
  AlertCircle,
  Phone,
} from "lucide-react"
import { seedlings } from "@/lib/seedlings-data"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const categoryColors: Record<string, { bgColor: string; image: string }> = {
  mango: {
    bgColor: "from-blue-900 to-blue-950",
    image: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  citrus: {
    bgColor: "from-purple-800 to-purple-900",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80"
  },
  avocado: {
    bgColor: "from-teal-800 to-teal-900",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80"
  },
  berries: {
    bgColor: "from-red-900 to-purple-900",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&auto=format&fit=crop"
  },
  tropical: {
    bgColor: "from-orange-800 to-pink-800",
    image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&auto=format&fit=crop"
  }
}

export default function PlantCarePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const seedling = seedlings.find((s) => s.id === id)

  if (!seedling) {
    return (
      <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Seedling Not Found</h1>
          <Link href="/#seedlings" className="text-green-400 hover:text-green-300">
            Back to Seedlings
          </Link>
        </div>
      </div>
    )
  }

  const care = seedling.careGuide
  const categoryColor = categoryColors[seedling.category] || categoryColors.mango

  // Generate seedling-specific issues from care guide data
  const generateIssues = () => {
    const issues: Array<{ title: string; solution: string }> = []
    
    if (!care) return issues

    // Combine all care guide content for analysis
    const allContent = [
      care.pests || "",
      care.watering || "",
      care.fertilizer || "",
      care.temperature || "",
      care.soil || "",
    ].join(" ").toLowerCase()

    const pestsContent = (care.pests || "").toLowerCase()
    
    // Check for common pests (prioritize most common)
    const pestKeywords = [
      { keyword: /mango fruit fly|fruit fly/i, title: "Fruit Fly Infestation", solution: "Use pheromone traps and organic baits. Remove and destroy affected fruits immediately. Maintain orchard hygiene to prevent breeding sites. Harvest fruits early if infestation is severe." },
      { keyword: /aphids/i, title: "Aphid Infestation", solution: "Spray with neem oil or insecticidal soap. Introduce beneficial insects like ladybugs. Remove affected leaves and maintain good air circulation. Control ants that protect aphids." },
      { keyword: /mealybugs/i, title: "Mealybug Problem", solution: "Apply neem oil spray directly on affected areas. Remove heavily infested parts. Maintain good sanitation and avoid over-fertilization which attracts mealybugs. Use systemic insecticides if severe." },
      { keyword: /scale|scales/i, title: "Scale Insects", solution: "Use horticultural oil or neem oil during dormant season. Prune heavily infested branches. Maintain plant health to reduce susceptibility. Scrape off scales manually for small infestations." },
      { keyword: /thrips/i, title: "Thrips Damage", solution: "Use blue sticky traps to monitor. Apply neem oil or insecticidal soap. Ensure proper spacing for good air circulation. Remove weeds that serve as hosts." },
      { keyword: /spider mites|mites/i, title: "Spider Mite Infestation", solution: "Increase humidity around plants. Spray with water to dislodge mites. Use neem oil or miticides if severe. Avoid dusty conditions that favor mites." },
      { keyword: /weevil|weevils/i, title: "Weevil Infestation", solution: "Remove and destroy affected plant parts. Use biological controls like beneficial nematodes. Maintain good orchard hygiene. Apply appropriate insecticides during active periods." },
      { keyword: /borer|borers/i, title: "Borer Problem", solution: "Remove and destroy affected branches immediately. Apply appropriate insecticides to trunk and branches. Maintain tree health to prevent infestation. Use pheromone traps for monitoring." },
      { keyword: /nematodes/i, title: "Nematode Problem", solution: "Use resistant varieties. Practice crop rotation. Apply organic matter and beneficial nematodes. Solarize soil before planting." },
    ]

    // Check for common diseases
    const diseaseKeywords = [
      { keyword: /powdery mildew/i, title: "Powdery Mildew", solution: "Improve air circulation through pruning. Apply sulfur-based or copper fungicides. Avoid overhead watering and maintain proper spacing. Remove affected leaves promptly." },
      { keyword: /anthracnose/i, title: "Anthracnose Disease", solution: "Remove and destroy infected plant parts. Apply copper-based fungicides preventively. Ensure good drainage and avoid waterlogging. Prune to improve air circulation." },
      { keyword: /root rot|root rot/i, title: "Root Rot", solution: "Improve soil drainage immediately. Avoid overwatering. Apply fungicides and ensure proper spacing for air circulation. Remove affected plants to prevent spread." },
      { keyword: /canker|cankers/i, title: "Canker Disease", solution: "Prune affected branches below canker. Apply copper-based fungicides. Maintain tree health and avoid mechanical damage. Disinfect pruning tools between cuts." },
      { keyword: /wilt|wilt/i, title: "Wilt Disease", solution: "Remove and destroy affected plants immediately. Improve soil drainage. Use disease-resistant varieties and practice crop rotation. Avoid planting in infected soil." },
      { keyword: /blight|blight/i, title: "Blight Problem", solution: "Remove infected leaves and fruits promptly. Apply appropriate fungicides preventively. Ensure good air circulation and avoid overhead watering. Practice crop rotation." },
      { keyword: /die back|dieback/i, title: "Die Back", solution: "Prune affected branches back to healthy tissue. Apply fungicides. Improve tree health through proper fertilization and watering. Remove dead wood regularly." },
      { keyword: /sooty mold|sooty mould/i, title: "Sooty Mold", solution: "Control the insects (aphids, mealybugs, scales) that produce honeydew. Wash off sooty mold with water and mild soap. Improve air circulation." },
    ]

    // Check for nutrient deficiencies
    const deficiencyKeywords = [
      { keyword: /potassium deficiency/i, title: "Potassium Deficiency", solution: "Apply potassium-rich fertilizer (potash). Use wood ash or potassium sulfate. Ensure proper soil pH for nutrient uptake. Apply during flowering for better fruit set." },
      { keyword: /nitrogen deficiency/i, title: "Nitrogen Deficiency", solution: "Apply nitrogen-rich fertilizer or organic compost. Use foliar feeding for quick correction. Ensure proper watering for nutrient uptake. Avoid over-application which can cause excessive growth." },
      { keyword: /zinc deficiency/i, title: "Zinc Deficiency", solution: "Apply zinc sulfate or chelated zinc. Foliar application provides quick results. Maintain proper soil pH (avoid highly alkaline soils). Apply during active growth periods." },
      { keyword: /boron deficiency/i, title: "Boron Deficiency", solution: "Apply borax or boric acid in small amounts (toxic if over-applied). Foliar application is most effective. Avoid over-liming which can cause boron deficiency. Apply during flowering." },
    ]

    // Check for watering issues
    if (allContent.includes("drought") || allContent.includes("water stress") || allContent.includes("dry")) {
      if (!issues.some(issue => issue.title.includes("Water"))) {
        issues.push({
          title: "Water Stress",
          solution: "Ensure consistent watering, especially during dry periods. Use mulch to retain soil moisture. Install drip irrigation for efficient water delivery. Water deeply but less frequently."
        })
      }
    }
    if (allContent.includes("overwatering") || allContent.includes("waterlogging") || allContent.includes("poor drainage")) {
      if (!issues.some(issue => issue.title.includes("Water"))) {
        issues.push({
          title: "Overwatering/Waterlogging",
          solution: "Improve soil drainage immediately. Reduce watering frequency. Ensure proper spacing and avoid compacted soil. Consider raised beds for better drainage."
        })
      }
    }

    // Check for temperature issues
    if (allContent.includes("frost") || allContent.includes("cold") || allContent.includes("freeze")) {
      issues.push({
        title: "Cold/Frost Damage",
        solution: "Protect plants during cold periods with covers or windbreaks. Choose appropriate planting locations. Consider frost-resistant varieties. Water plants before expected frost to help protect roots."
      })
    }

    // Add pest issues found in content (prioritize first matches)
    for (const { keyword, title, solution } of pestKeywords) {
      if (keyword.test(pestsContent) && !issues.some(issue => issue.title === title) && issues.length < 4) {
        issues.push({ title, solution })
      }
    }

    // Add disease issues found in content
    for (const { keyword, title, solution } of diseaseKeywords) {
      if (keyword.test(pestsContent) && !issues.some(issue => issue.title === title) && issues.length < 4) {
        issues.push({ title, solution })
      }
    }

    // Add deficiency issues found in content
    for (const { keyword, title, solution } of deficiencyKeywords) {
      if (keyword.test(pestsContent) && !issues.some(issue => issue.title === title) && issues.length < 4) {
        issues.push({ title, solution })
      }
    }

    // Add common issues if we don't have enough specific issues
    const commonIssues = [
      {
        title: "Slow Growth",
        solution: `Ensure adequate sunlight (${care.sunlight?.match(/\d+/) || "6+"} hours) as specified. Apply appropriate fertilizer and maintain proper watering schedule. Check for root-bound conditions.`
      },
      {
        title: "Poor Fruit Set",
        solution: `Ensure plant has reached maturity (${care.timeToFruit || "2-3 years"}). Apply potassium-rich fertilizer during flowering. Maintain proper temperature and pollination conditions. Ensure adequate water during flowering.`
      },
      {
        title: "Yellow Leaves",
        solution: "Often indicates nutrient deficiency or overwatering. Check soil moisture and apply balanced fertilizer according to care guide. Test soil pH and adjust if needed."
      },
      {
        title: "General Pest Problems",
        solution: "Use neem oil spray and maintain good sanitation. Remove affected leaves. Follow integrated pest management practices. Monitor regularly for early detection."
      }
    ]

    // Fill remaining slots with common issues
    while (issues.length < 4) {
      const availableIssue = commonIssues.find(issue => !issues.some(existing => existing.title === issue.title))
      if (availableIssue) {
        issues.push(availableIssue)
      } else {
        break
      }
    }

    return issues.slice(0, 4) // Return maximum 4 issues
  }

  const commonIssues = generateIssues()

  const careItems = [
    {
      key: "watering",
      label: "Watering",
      icon: Droplet,
      iconBg: "bg-blue-600/20",
      iconColor: "text-blue-400",
      content: care?.watering,
    },
    {
      key: "sunlight",
      label: "Sunlight",
      icon: Sun,
      iconBg: "bg-yellow-600/20",
      iconColor: "text-yellow-400",
      content: care?.sunlight,
    },
    {
      key: "soil",
      label: "Soil Requirements",
      icon: Leaf,
      iconBg: "bg-green-600/20",
      iconColor: "text-green-400",
      content: care?.soil,
    },
    {
      key: "temperature",
      label: "Temperature",
      icon: Thermometer,
      iconBg: "bg-red-600/20",
      iconColor: "text-red-400",
      content: care?.temperature,
    },
    {
      key: "fertilizer",
      label: "Fertilizer",
      icon: Zap,
      iconBg: "bg-purple-600/20",
      iconColor: "text-purple-400",
      content: care?.fertilizer,
    },
    {
      key: "spacing",
      label: "Spacing",
      icon: Ruler,
      iconBg: "bg-indigo-600/20",
      iconColor: "text-indigo-400",
      content: care?.spacing,
    },
    {
      key: "timeToFruit",
      label: "Time to Fruit",
      icon: Clock,
      iconBg: "bg-orange-600/20",
      iconColor: "text-orange-400",
      content: care?.timeToFruit,
    },
    {
      key: "pests",
      label: "Pest & Disease Management",
      icon: Bug,
      iconBg: "bg-rose-600/20",
      iconColor: "text-rose-400",
      content: care?.pests,
    },
  ]

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryColor.bgColor} opacity-30`}
          style={{
            backgroundImage: `url(${categoryColor.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/seedlings/${seedling.category}`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)}</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Icon */}
            <div className="flex justify-center md:justify-start">
              <div className="text-9xl drop-shadow-lg">{seedling.icon}</div>
            </div>

            {/* Content */}
            <div className="md:col-span-2 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">{seedling.name}</h1>
              <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Complete care guide for premium {seedling.category} seedling. Follow these instructions for optimal
                growth and maximum yield.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-xl font-bold text-white capitalize">{seedling.category}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-xl font-bold text-green-400">KES {seedling.price.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-gray-400 text-sm">Time to Fruit</p>
                  <p className="text-xl font-bold text-white">
                    {care?.timeToFruit ? care.timeToFruit.split(' ').slice(0, 2).join(' ') : '2-3 years'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        {care && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Complete Care Guide Section */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 text-center md:text-left">
                Complete <span className="font-light text-green-400">Care Guide</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-12 max-w-3xl mx-auto md:mx-0 text-center md:text-left">
                Detailed care instructions for growing your {seedling.name} seedling successfully
              </p>

              {/* Care Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careItems.map((item) => {
                  const Icon = item.icon
                  const isPestCard = item.key === "pests"
                  const isTimeToFruitCard = item.key === "timeToFruit"

                  // Format pest content with bullet points and bold text
                  const formatPestContent = (content: string | undefined) => {
                    if (!content) return null

                    // Split by major sections (Pests:, Diseases:, etc.)
                    const sectionRegex = /(Pests|Diseases|Pest|Disease|Nutritional Deficiencies|Market|Varieties|Key Characteristics|Intercropping|Wind Protection|Harvesting|Pruning|Irrigation|Fertilization|Propagation|Expert consultation|Market Potential|Value-added products|Nutritional Benefits|Support Structures|Site Selection|Planting|Market Opportunity):\s*/gi
                    const sections: Array<{ heading: string; content: string }> = []
                    
                    let lastIndex = 0
                    let match
                    const sectionMatches: Array<{ index: number; heading: string }> = []
                    
                    // Reset regex lastIndex
                    sectionRegex.lastIndex = 0
                    while ((match = sectionRegex.exec(content)) !== null) {
                      sectionMatches.push({ index: match.index, heading: match[1] })
                    }

                    if (sectionMatches.length === 0) {
                      sections.push({ heading: "", content: content.trim() })
                    } else {
                      sectionMatches.forEach((sectionMatch, idx) => {
                        const start = sectionMatch.index + sectionMatch.heading.length + 1
                        const end = idx < sectionMatches.length - 1 ? sectionMatches[idx + 1].index : content.length
                        const sectionContent = content.substring(start, end).trim()
                        if (sectionContent) {
                          sections.push({
                            heading: sectionMatch.heading,
                            content: sectionContent
                          })
                        }
                      })
                    }

                    return (
                      <div className="space-y-4">
                        {sections.map((section, idx) => {
                          if (!section.content.trim()) return null

                          // Split items - try to split by numbered items first, then by commas
                          let items: string[] = []
                          
                          // Try splitting by numbered items (1., 2., etc.)
                          const numberedSplit = section.content.split(/(?=\d+[\.\)]\s+[A-Z])/)
                          if (numberedSplit.length > 1 && numberedSplit.some(item => /^\d+[\.\)]/.test(item.trim()))) {
                            items = numberedSplit.filter(item => item.trim().length > 2)
                          } else {
                            // Split by commas, but be smart about it (don't split inside parentheses)
                            let currentItem = ""
                            let parenDepth = 0
                            for (let i = 0; i < section.content.length; i++) {
                              const char = section.content[i]
                              if (char === '(') parenDepth++
                              else if (char === ')') parenDepth--
                              else if (char === ',' && parenDepth === 0) {
                                if (currentItem.trim()) {
                                  items.push(currentItem.trim())
                                  currentItem = ""
                                  continue
                                }
                              }
                              currentItem += char
                            }
                            if (currentItem.trim()) items.push(currentItem.trim())
                          }

                          // Filter out very short items
                          items = items.filter(item => item.trim().length > 3)

                          return (
                            <div key={idx} className="space-y-2">
                              {section.heading && (
                                <h4 className="font-bold text-white text-base mb-2">{section.heading}:</h4>
                              )}
                              <ul className="list-none space-y-1.5 ml-0">
                                {items.map((item, itemIdx) => {
                                  const trimmed = item.trim()
                                  if (!trimmed) return null

                                  // Extract label and description
                                  // Pattern: "Label (description)" or "Number. Label (description)" or "Label: description"
                                  const numberedMatch = trimmed.match(/^(\d+[\.\)]\s*)?(.+?)(?:\s*[\(:–—]|$)/)
                                  const fullLabel = numberedMatch ? numberedMatch[2].trim() : trimmed.split(/[\(:–—]/)[0].trim()
                                  
                                  // Remove number prefix if present
                                  const label = fullLabel.replace(/^\d+[\.\)]\s*/, '').trim()
                                  
                                  // Get description (content in parentheses or after colon/dash)
                                  const parenMatch = trimmed.match(/\(([^)]+)\)/)
                                  const colonMatch = !parenMatch && trimmed.match(/[–—:]\s*(.+)$/)
                                  const description = parenMatch ? parenMatch[1] : (colonMatch ? colonMatch[1] : null)

                                  return (
                                    <li key={itemIdx} className="flex items-start gap-2">
                                      <span className="text-rose-400 mt-1.5 flex-shrink-0">•</span>
                                      <span className="text-gray-300 text-sm leading-relaxed">
                                        <span className="font-semibold text-white">{label}</span>
                                        {description && (
                                          <>
                                            {' '}
                                            <span className="text-gray-400">({description})</span>
                                          </>
                                        )}
                                      </span>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }

                  return (
                    <div
                      key={item.key}
                      className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                        isTimeToFruitCard ? "self-start h-fit" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${item.iconBg} flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                          {isPestCard ? (
                            formatPestContent(item.content)
                          ) : (
                            <p className="text-gray-300 leading-relaxed text-sm">
                              {item.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-12 md:mb-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center md:text-left">
                Growing <span className="font-light text-green-400">Timeline</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 1</p>
                  <h3 className="text-lg font-bold text-white mb-2">Planting</h3>
                  <p className="text-gray-300 text-sm">Prepare soil, plant seedling, water thoroughly</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 2</p>
                  <h3 className="text-lg font-bold text-white mb-2">Establishment</h3>
                  <p className="text-gray-300 text-sm">Regular watering, fertilizer application</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 3</p>
                  <h3 className="text-lg font-bold text-white mb-2">Growth</h3>
                  <p className="text-gray-300 text-sm">Pruning, maintenance, pest management</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-xs font-bold text-green-400 uppercase mb-3">Phase 4</p>
                  <h3 className="text-lg font-bold text-white mb-2">Fruiting</h3>
                  <p className="text-gray-300 text-sm">Harvest and ongoing maintenance</p>
                </div>
              </div>
            </div>

            {/* Common Issues Section */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center md:text-left">
                Common <span className="font-light text-green-400">Issues & Solutions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commonIssues.map((issue, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{issue.title}</h3>
                        <p className="text-gray-300 text-sm">{issue.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reference Box */}
            <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-2xl p-8 sm:p-12 border-2 border-green-500/40 mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center md:text-left">Quick Reference</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Min Temperature</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">10°C</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Ideal Sunlight</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">6+ hrs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Water Frequency</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">Regular</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase font-semibold">Soil pH</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400">6.0-7.0</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-600/10 to-green-700/10 border-t border-green-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Ready to start growing?</h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Order this premium {seedling.name} seedling today and begin your agricultural success story
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/seedlings/${seedling.category}`}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition font-semibold text-base whitespace-nowrap border border-white/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                View All Varieties
              </Link>
              <a
                href={`https://wa.me/254713764658?text=${encodeURIComponent(`Hi, I'm interested in ${seedling.name}. Please provide more information.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-bold text-base whitespace-nowrap shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
