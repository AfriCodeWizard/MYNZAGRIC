"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, Plus, Minus, X, Phone, Leaf } from "lucide-react"
import { seedlings } from "@/lib/seedlings-data"
import Navbar from "@/components/navbar"

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

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
    description: "Choose from 5 premium grafted varieties including Tommy, Apple, Van Dyke, Ngowe, and Alphonso mangoes. Fast-growing, high-yield trees that start fruiting in 2-3 years. Perfect for commercial farming or home gardens.",
    bgImage: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800",
    bgColor: "from-blue-900 to-blue-950"
  },
  citrus: {
    label: "Citrus",
    icon: "🍊",
    description: "Explore 12 diverse citrus varieties from sweet Pixies and Valencia oranges to tangy Kumquats and Tangerines. Disease-resistant, grafted seedlings ready for your orchard. Fresh, vitamin-rich fruits year after year.",
    bgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
    bgColor: "from-purple-800 to-purple-900"
  },
  avocado: {
    label: "Avocados",
    icon: "🥑",
    description: "Premium Hass and Fuerte avocado varieties. High-value crop with excellent market demand. Start harvesting delicious, nutrient-rich avocados in 2-3 years. Perfect for export and local markets.",
    bgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
    bgColor: "from-teal-800 to-teal-900"
  },
  berries: {
    label: "Berries",
    icon: "🫐",
    description: "Sweet success with 3 premium berry varieties. High antioxidant content, perfect for health-conscious markets. Fast-growing plants ideal for small-scale and commercial farming. Fresh berries at your fingertips.",
    bgImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&auto=format&fit=crop",
    bgColor: "from-red-900 to-purple-900"
  },
  tropical: {
    label: "Tropical",
    icon: "🍍",
    description: "Discover 33 exotic tropical fruit varieties including passion fruit, guavas, papayas, and more! Premium tissue-culture and grafted seedlings. Transform your farm with diverse, profitable tropical fruits loved by local and export markets.",
    bgImage: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&auto=format&fit=crop",
    bgColor: "from-orange-800 to-pink-800"
  }
}

const kenyanCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
  "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
  "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River",
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
].sort()

export default function SeedlingsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const category = categories[resolvedParams.category]
  const categorySeedlings = seedlings.filter((s) => s.category === resolvedParams.category)

  if (!category || categorySeedlings.length === 0) {
    return (
      <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <Link href="/#seedlings" className="text-green-400 hover:text-green-300">
            Back to Seedlings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <SeedlingsCategoryContent 
      category={resolvedParams.category}
      categoryData={category}
      seedlings={categorySeedlings}
    />
  )
}

function SeedlingsCategoryContent({
  category,
  categoryData,
  seedlings
}: {
  category: string
  categoryData: typeof categories[string]
  seedlings: typeof seedlings
}) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [deliveryLocation, setDeliveryLocation] = useState<string>("")

  const addToCart = (seedling: typeof seedlings[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === seedling.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === seedling.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { id: seedling.id, name: seedling.name, quantity: 1, price: seedling.price }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const generateWhatsAppMessage = () => {
    const items = cart
      .map((item, index) => `${index + 1}. *${item.name}*\n   Quantity: ${item.quantity}\n   Price: KES ${(item.price * item.quantity).toLocaleString()}`)
      .join("\n\n")

    const locationText = deliveryLocation ? `\n*Delivery Location:* ${deliveryLocation}\n` : ""

    const message = `*ORDER REQUEST - MYNZAGRIC*

─────────────────────────

*ORDER ITEMS:*

${items}

─────────────────────────

*ORDER SUMMARY:*
Subtotal: KES ${totalPrice.toLocaleString()}
Delivery Fee: *Pending upon order confirmation*${locationText}
─────────────────────────

Please confirm availability and provide delivery details.

Thank you!`

    return encodeURIComponent(message)
  }

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryData.bgColor} opacity-30`}
          style={{
            backgroundImage: `url(${categoryData.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#seedlings"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {categoryData.label} Varieties
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              {categoryData.description}
            </p>
            <p className="text-gray-400 mt-4">
              {seedlings.length} {seedlings.length === 1 ? 'variety' : 'varieties'} available
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {seedlings.map((seedling) => (
              <div
                key={seedling.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryData.bgColor} opacity-50`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{categoryData.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white text-lg line-clamp-2 flex-1">
                      {seedling.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-400">
                      KES {seedling.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                      per seedling
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(seedling)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/plant-care/${seedling.id}`}
                      className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
                      title="View Plant Care Guide"
                    >
                      <Leaf className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white font-bold p-4 rounded-full shadow-lg transition-all duration-300 z-40 flex items-center gap-2"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="bg-white text-green-600 rounded-full px-2 py-1 text-sm font-bold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </button>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center md:justify-end z-50">
          <div className="w-full md:w-96 bg-white rounded-t-2xl md:rounded-lg shadow-2xl md:mr-4 md:mb-4 flex flex-col max-h-[90vh] md:max-h-[600px]">
            <div className="flex items-center justify-between p-6 border-b border-green-100">
              <h3 className="text-xl font-bold text-gray-900">Bulk Order</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</p>
                        <p className="text-sm text-green-600 font-bold">KES {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-green-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4 text-green-600" />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4 text-green-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-50 transition rounded"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-green-100 bg-gray-50 space-y-4">
                  <div>
                    <label htmlFor="delivery-location" className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="delivery-location"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      required
                    >
                      <option value="">Select County</option>
                      {kenyanCounties.map((county) => (
                        <option key={county} value={county}>
                          {county}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <div className="flex flex-col">
                      <span className="text-gray-600">Delivery Fee:</span>
                      <span className="text-xs text-red-500 italic">Pending upon order confirmation</span>
                    </div>
                    <span className="font-semibold text-red-500">—</span>
                  </div>
                  <div className="flex justify-between items-center border-t-2 border-green-200 pt-3 mt-2">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-green-600">KES {totalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!deliveryLocation) {
                        alert("Please select a delivery location")
                        return
                      }
                      window.open(`https://wa.me/254713764658?text=${generateWhatsAppMessage()}`, '_blank')
                    }}
                    disabled={!deliveryLocation}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                      deliveryLocation
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    Order on WhatsApp
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

