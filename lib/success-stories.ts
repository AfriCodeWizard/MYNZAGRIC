export interface SuccessStory {
  id: string
  slug: string
  name: string
  type: string
  location: string
  image: string
  shortDescription: string
  fullDescription: string
  challenge: string
  solution: string
  results: string[]
  quote?: string
  stats?: {
    label: string
    value: string
  }[]
}

export const successStories: SuccessStory[] = [
  {
    id: "1",
    slug: "emma-thompson-avocado-orchard",
    name: "Emma Thompson",
    type: "Success Story",
    location: "Tanzania",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    shortDescription: "Starting with just 200 Hass avocado seedlings and a complete drip irrigation kit, Emma transformed her 2-acre farm into a thriving export business generating $18,000 annually from premium fruit production.",
    fullDescription: "Emma Thompson's transformation from subsistence farming to commercial agribusiness exemplifies the power of premium seedlings combined with precision irrigation. After years of struggling with low-yield traditional varieties, she invested in MYNZAGRIC's certified Hass avocado seedlings and our complete drip irrigation system. Within 18 months, her farm became a model operation, attracting buyers from international markets.",
    challenge: "Emma struggled with traditional avocado varieties that took 5-7 years to bear fruit and produced inconsistent yields. Her farm relied entirely on rainfall, resulting in crop losses during dry seasons. She lacked access to premium grafted varieties and modern irrigation technology, limiting her income potential despite having suitable land.",
    solution: "MYNZAGRIC provided Emma with 200 certified Hass avocado seedlings, known for early fruiting (18-24 months) and high market demand. We installed a complete drip irrigation system covering her entire 2-acre farm, ensuring consistent water supply year-round. Our team provided comprehensive care guides and ongoing support to ensure optimal growth and fruit quality.",
    results: [
      "First harvest in 20 months with 1,200 kg of premium Hass avocados",
      "Annual income increased from $2,400 to $18,000 (650% increase)",
      "Achieved 95% seedling survival rate with proper irrigation",
      "Secured export contracts with buyers in Europe and Middle East",
      "Expanded to 5 acres and now employs 4 full-time workers"
    ],
    quote: "MYNZAGRIC's Hass seedlings and irrigation system turned my small farm into a profitable business. I'm now exporting avocados and my children are in university.",
    stats: [
      { label: "Farm Size", value: "5 Acres" },
      { label: "Annual Revenue", value: "$18,000" },
      { label: "ROI Timeline", value: "20 Months" }
    ]
  },
  {
    id: "2",
    slug: "carlos-martinez-mango-plantation",
    name: "Carlos Martinez",
    type: "Success Story",
    location: "Colombia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    shortDescription: "Carlos established a 3-acre mango plantation using 450 grafted mango seedlings and precision irrigation, achieving 4x higher yields than traditional varieties and generating $24,000 in annual revenue.",
    fullDescription: "Carlos Martinez's success story demonstrates how premium grafted seedlings can revolutionize fruit farming. After years of disappointment with traditional mango varieties that produced small, low-quality fruits, Carlos invested in MYNZAGRIC's premium grafted mango seedlings (Kent, Keitt, and Tommy Atkins varieties) along with our precision drip irrigation system. His plantation now serves global markets.",
    challenge: "Carlos faced multiple challenges: traditional mango varieties took 6-8 years to fruit, produced inconsistent quality, and were vulnerable to diseases. Water management was inefficient, leading to 40% crop loss during dry periods. He struggled to compete in premium markets due to fruit quality issues.",
    solution: "MYNZAGRIC supplied 450 grafted mango seedlings of premium export varieties, each guaranteed to fruit within 2-3 years. We installed a comprehensive drip irrigation system with fertigation capabilities, ensuring optimal nutrition and water delivery. Our technical team provided training on modern orchard management practices and pest control.",
    results: [
      "First commercial harvest in 28 months with 8,500 kg of premium mangoes",
      "Annual revenue increased from $4,200 to $24,000 (471% increase)",
      "Achieved 92% seedling establishment rate with irrigation support",
      "Fruits meet export quality standards, commanding premium prices",
      "Created 6 seasonal employment opportunities during harvest"
    ],
    quote: "The grafted mangoes from MYNZAGRIC are game-changers. Combined with drip irrigation, I'm producing export-quality fruits that buyers compete for.",
    stats: [
      { label: "Plantation Size", value: "3 Acres" },
      { label: "Annual Revenue", value: "$24,000" },
      { label: "Seedling Survival", value: "92%" }
    ]
  },
  {
    id: "3",
    slug: "priya-sharma-berry-farm",
    name: "Priya Sharma",
    type: "Success Story",
    location: "India",
    image: "https://images.unsplash.com/photo-1529156069898-49953e41bcc6?w=800&q=80",
    shortDescription: "Priya established a high-value berry farm using MYNZAGRIC's premium berry seedlings and micro-irrigation system, generating $15,600 annually from just 1.5 acres while supplying premium berries to urban markets.",
    fullDescription: "Priya Sharma's journey showcases how premium berry varieties can create profitable farming opportunities even on small landholdings. Starting with MYNZAGRIC's premium berry seedlings (strawberries, blueberries, and raspberries) and our specialized micro-irrigation system, she built a thriving agribusiness that supplies premium berries to high-end markets and restaurants.",
    challenge: "Priya wanted to maximize income from her limited 1.5-acre plot. Traditional crops like vegetables provided minimal returns. She needed high-value crops that could thrive in her region's climate while requiring efficient water management. Access to quality berry seedlings and modern irrigation technology was a major barrier.",
    solution: "MYNZAGRIC provided 1,200 premium berry seedlings (400 each of strawberries, blueberries, and raspberries) along with a specialized micro-irrigation system designed for berry cultivation. The system includes precise water delivery, fertigation capabilities, and mulching support. We provided detailed care guides specific to each berry variety and ongoing technical support.",
    results: [
      "First harvest in 8 months with strawberries, generating $6,200 in first year",
      "Annual revenue of $15,600 from 1.5 acres (highest per-acre income in region)",
      "Achieved 88% seedling survival with proper irrigation and care",
      "Established direct supply relationships with 12 premium restaurants",
      "Diversified income with year-round berry production across varieties"
    ],
    quote: "MYNZAGRIC's berry seedlings and irrigation system turned my small farm into a high-income business. I'm earning more from 1.5 acres than my neighbors do from 10 acres.",
    stats: [
      { label: "Farm Size", value: "1.5 Acres" },
      { label: "Annual Revenue", value: "$15,600" },
      { label: "Per-Acre Income", value: "$10,400" }
    ]
  }
]

export function getStoryBySlug(slug: string): SuccessStory | undefined {
  return successStories.find(story => story.slug === slug)
}

export function getAllStorySlugs(): string[] {
  return successStories.map(story => story.slug)
}

