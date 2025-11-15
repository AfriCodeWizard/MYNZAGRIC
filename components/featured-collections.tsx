"use client"

import { ShoppingCart } from "lucide-react"

interface CollectionItem {
  id: string
  name: string
}

interface Collection {
  id: string
  title: string
  description: string
  seedlings: CollectionItem[]
  price: number
  icon: string
}

const collections: Collection[] = [
  {
    id: "citrus-combo",
    title: "Citrus Paradise",
    description: "A perfect blend of citrus varieties for year-round harvests",
    seedlings: [
      { id: "orange", name: "Orange" },
      { id: "lemon", name: "Lemon" },
      { id: "lime", name: "Lime" },
    ],
    price: 4500,
    icon: "🍊",
  },
  {
    id: "berry-bliss",
    title: "Berry Bliss",
    description: "Mix of berry varieties for a productive fruit garden",
    seedlings: [
      { id: "strawberry", name: "Strawberry" },
      { id: "blueberry", name: "Blueberry" },
      { id: "raspberry", name: "Raspberry" },
    ],
    price: 3500,
    icon: "🫐",
  },
  {
    id: "tropical-treasure",
    title: "Tropical Treasure",
    description: "Exotic tropical fruits for a premium harvest experience",
    seedlings: [
      { id: "mango", name: "Mango" },
      { id: "avocado", name: "Avocado" },
      { id: "passion-fruit", name: "Passion Fruit" },
    ],
    price: 5500,
    icon: "🥭",
  },
  {
    id: "stone-fruit-selection",
    title: "Stone Fruit Selection",
    description: "Premium stone fruits for garden abundance",
    seedlings: [
      { id: "peach", name: "Peach" },
      { id: "plum", name: "Plum" },
      { id: "apricot", name: "Apricot" },
    ],
    price: 4200,
    icon: "🍑",
  },
]

export default function FeaturedCollections() {
  const handleAddCollection = (collection: Collection) => {
    const whatsappMessage = `Hi! I'm interested in the ${collection.title} collection with ${collection.seedlings.map((s) => s.name).join(", ")}. Total: KES ${collection.price.toLocaleString()}`
    const encodedMessage = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/254700000000?text=${encodedMessage}`, "_blank")
  }

  return (
    <section className="w-full bg-gradient-to-b from-white to-emerald-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            CURATED <span className="font-light text-gray-500">COLLECTIONS</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Handpicked combinations of seedlings that grow beautifully together, designed for maximum productivity and
            aesthetic appeal
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-300"
            >
              {/* Icon Header */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 text-center">
                <div className="text-5xl mb-3">{collection.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{collection.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                <p className="text-sm text-gray-600 mb-4 flex-1">{collection.description}</p>

                {/* Seedlings List */}
                <div className="mb-6 space-y-2">
                  {collection.seedlings.map((seedling) => (
                    <div key={seedling.id} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      {seedling.name}
                    </div>
                  ))}
                </div>

                {/* Price and Button */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">KES {collection.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm ml-2">Collection</span>
                  </div>
                  <button
                    onClick={() => handleAddCollection(collection)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Can't find the perfect combination? Contact us to create a custom collection
          </p>
          <a
            href="https://wa.me/254700000000?text=Hi! I'd like to create a custom seedling collection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Create Custom Collection
          </a>
        </div>
      </div>
    </section>
  )
}
