import type { Metadata } from "next"

const categories: Record<string, {
  label: string
  icon: string
  description: string
  bgImage: string
  bgColor: string
}> = {
  mango: {
    label: "Mangoes",
    icon: "🥭",
    description: "Choose from premium grafted varieties including Tommy, Apple, Van Dyke, Ngowe, and Alphonso mangoes. Fast-growing, high-yield trees that start fruiting in 3 years. Perfect for commercial farming or home gardens.",
    bgImage: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800",
    bgColor: "from-blue-900 to-blue-950"
  },
  citrus: {
    label: "Citrus",
    icon: "🍊",
    description: "Explore diverse citrus varieties from sweet Pixies and Valencia oranges to tangy Kumquats and Tangerines. Disease-resistant, grafted seedlings ready for your orchard. Fresh, vitamin-rich fruits year after year.",
    bgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
    bgColor: "from-purple-800 to-purple-900"
  },
  avocado: {
    label: "Avocados",
    icon: "🥑",
    description: "Premium Hass and Fuerte avocado varieties. High-value crop with excellent market demand. Start harvesting delicious, nutrient-rich avocados in 3 years. Perfect for export and local markets.",
    bgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
    bgColor: "from-teal-800 to-teal-900"
  },
  berries: {
    label: "Berries",
    icon: "🫐",
    description: "Sweet success with premium berry varieties. High antioxidant content, perfect for health-conscious markets. Fast-growing plants ideal for small-scale and commercial farming. Fresh berries at your fingertips.",
    bgImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&auto=format&fit=crop",
    bgColor: "from-red-900 to-purple-900"
  },
  tropical: {
    label: "Tropical",
    icon: "🍍",
    description: "Discover exotic tropical fruit varieties including passion fruit, guavas, papayas, and more! Premium grafted seedlings. Transform your farm with diverse, profitable tropical fruits loved by global markets.",
    bgImage: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&auto=format&fit=crop",
    bgColor: "from-orange-800 to-pink-800"
  }
}

export async function generateCategoryMetadata(category: string): Promise<Metadata> {
  const categoryData = categories[category]
  
  if (!categoryData) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${categoryData.label} Seedlings - Premium Grafted Varieties | Mynzagric`,
    description: categoryData.description,
    keywords: `${categoryData.label.toLowerCase()} seedlings, grafted ${categoryData.label.toLowerCase()}, premium ${categoryData.label.toLowerCase()} varieties, fruit seedlings Kenya`,
    openGraph: {
      title: `${categoryData.label} Seedlings - Premium Grafted Varieties`,
      description: categoryData.description,
      type: "website",
    },
    alternates: {
      canonical: `/seedlings/${category}`,
    },
  }
}

export { categories }


