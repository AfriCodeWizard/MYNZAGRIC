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
    slug: "maria-rodriguez",
    name: "Maria Rodriguez",
    type: "Case Study",
    location: "Uganda",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    shortDescription: "Upon acquiring our solar irrigation kit for her venture with the savings she had made, we facilitated connections with buyers willing to offer competitive rates for her strawberry produce.",
    fullDescription: "Maria Rodriguez's journey from a small-scale farmer to a successful agribusiness owner is a testament to the transformative power of climate-smart farming solutions. Starting with minimal savings, she invested in our solar irrigation kit, which became the cornerstone of her agricultural venture.",
    challenge: "Maria faced significant challenges in accessing reliable water sources for her strawberry farm. The inconsistent rainfall patterns and lack of irrigation infrastructure threatened her crop yields and income stability. Additionally, she struggled to find reliable buyers who would offer fair prices for her produce.",
    solution: "We provided Maria with a comprehensive solar irrigation kit that included solar-powered pumps and efficient drip irrigation systems. Beyond the equipment, we facilitated direct connections with buyers in the market, ensuring she received competitive rates for her high-quality strawberry produce.",
    results: [
      "Generated sufficient income to support her entire family in Uganda",
      "Expanded her business from a small plot to half an acre",
      "Achieved consistent crop yields throughout the year",
      "Established reliable buyer relationships with competitive pricing",
      "Reinvested profits to scale her farming operations"
    ],
    quote: "The solar irrigation system changed everything. I can now farm year-round and my family's future is secure.",
    stats: [
      { label: "Farm Size", value: "0.5 Acres" },
      { label: "Income Increase", value: "45%" },
      { label: "Crop Yield", value: "3x Increase" }
    ]
  },
  {
    id: "2",
    slug: "ahmed-hassan",
    name: "Ahmed Hassan",
    type: "Case Study",
    location: "Kenya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    shortDescription: "To address the water scarcity issue, Ahmed implemented strategic measures. He installed solar-powered pumps, acquired a dam liner for efficient water storage, and invested in our irrigation systems.",
    fullDescription: "Ahmed Hassan transformed his farming operation by addressing critical water management challenges. Through strategic investments in solar-powered irrigation and water storage solutions, he created a sustainable farming system that thrives even in water-scarce conditions.",
    challenge: "Ahmed's farm was located in a region experiencing severe water scarcity. The lack of reliable water sources during dry seasons severely limited his ability to grow fruits and vegetables. Traditional water collection methods were inefficient and time-consuming, leaving little time for actual farming activities.",
    solution: "Ahmed implemented a comprehensive water management solution that included solar-powered pumps to extract water from available sources, a dam liner for efficient water storage during rainy seasons, and our specialized irrigation systems designed specifically for growing fruits and vegetables. This integrated approach ensured year-round water availability.",
    results: [
      "Eliminated water scarcity issues completely",
      "Increased crop diversity with fruits and vegetables",
      "Reduced water wastage by 60% through efficient irrigation",
      "Extended growing seasons throughout the year",
      "Improved crop quality and market value"
    ],
    quote: "Water is no longer a constraint. I can grow what I want, when I want, and my yields have never been better.",
    stats: [
      { label: "Water Saved", value: "60%" },
      { label: "Crop Diversity", value: "8+ Varieties" },
      { label: "Growing Season", value: "Year-Round" }
    ]
  },
  {
    id: "3",
    slug: "shanzu-farmer-group",
    name: "Shanzu Farmer Group",
    type: "Case Study",
    location: "Mombasa, Kenya",
    image: "https://images.unsplash.com/photo-1529156069898-49953e41bcc6?w=800&q=80",
    shortDescription: "The Mombasa County government, in collaboration with the Swedish embassy, approached us to customize a solar-powered pump. This innovative solution was designed to draw water closer to the women's homes.",
    fullDescription: "The Shanzu Farmer Group represents a community-driven success story where innovative solar-powered solutions transformed not just farming practices, but entire community dynamics. This collaborative project between the Mombasa County government and the Swedish embassy brought water access directly to the community.",
    challenge: "Women in the Shanzu community faced a daily struggle of walking long distances to fetch water, consuming hours of their day that could have been spent on farming or other productive activities. This burden also affected children, who often had to help with water collection, impacting their education. The community needed a solution that would bring water closer to their homes while supporting sustainable farming practices.",
    solution: "We customized a solar-powered pump system specifically designed for the Shanzu community's needs. The system draws water from a nearby source and distributes it to strategic points closer to the women's homes. This innovative approach eliminated the need for long-distance water collection while providing reliable water for both domestic use and irrigation.",
    results: [
      "Reduced water collection time by 90%",
      "Enabled women to focus on farming and income generation",
      "Improved children's access to education",
      "Increased community farming productivity",
      "Created sustainable water access for 50+ households"
    ],
    quote: "Now we have time for our farms and our children can go to school. This has changed our entire community.",
    stats: [
      { label: "Households Served", value: "50+" },
      { label: "Time Saved", value: "90%" },
      { label: "Community Impact", value: "200+ People" }
    ]
  }
]

export function getStoryBySlug(slug: string): SuccessStory | undefined {
  return successStories.find(story => story.slug === slug)
}

export function getAllStorySlugs(): string[] {
  return successStories.map(story => story.slug)
}

