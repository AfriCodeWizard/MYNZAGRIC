"use client"

import { useState, useMemo } from "react"
import ProductCard from "./product-card"
import { seedlings } from "@/lib/seedlings-data"
import { Search, X, ShoppingBag, Plus, Minus } from "lucide-react"

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = [
    { value: "all", label: "All Varieties" },
    { value: "mango", label: "Mangoes" },
    { value: "citrus", label: "Citrus" },
    { value: "avocado", label: "Avocados" },
    { value: "berries", label: "Berries" },
    { value: "tropical", label: "Tropical" },
  ]

  const filteredSeedlings = useMemo(() => {
    let filtered = selectedCategory === "all" ? seedlings : seedlings.filter((s) => s.category === selectedCategory)

    if (searchQuery.trim()) {
      filtered = filtered.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered
  }, [selectedCategory, searchQuery])

  const addToCart = (seedling: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === seedling.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === seedling.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { id: seedling.id, name: seedling.name, quantity: 1, price: seedling.price }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const generateWhatsAppMessage = () => {
    const items = cart
      .map((item) => `${item.name} (Qty: ${item.quantity}) - KES ${item.price * item.quantity}`)
      .join("\n")
    const message = `Hi Mynzagric, I'd like to order:\n\n${items}\n\nTotal: KES ${totalPrice}`
    return encodeURIComponent(message)
  }

  return (
    <section id="seedlings" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Cart Button */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              SEEDLING <span className="font-light text-gray-500">VARIETIES</span>
              <br />& PRICES
            </h2>
            <p className="text-lg text-gray-600">Premium grafted and tissue-culture varieties</p>
          </div>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            title="Bulk Order Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search seedlings by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full font-medium transition text-sm whitespace-nowrap ${
                  selectedCategory === category.value
                    ? "bg-green-700 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Results Counter */}
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredSeedlings.length}</span> seedling
            {filteredSeedlings.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Product Grid */}
        {filteredSeedlings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeedlings.map((seedling) => (
              <ProductCard key={seedling.id} seedling={seedling} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 mb-2">No seedlings found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or category filters</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-end md:items-center md:justify-end z-50">
            <div className="w-full md:w-96 bg-white rounded-t-2xl md:rounded-lg shadow-2xl md:mr-4 md:mb-4 flex flex-col max-h-96 md:max-h-[600px]">
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
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-green-100 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-green-600">KES {totalPrice.toLocaleString()}</span>
                    </div>
                    <a
                      href={`https://wa.me/254700000000?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition text-center block"
                    >
                      Order on WhatsApp
                    </a>
                    <button
                      onClick={() => setCart([])}
                      className="w-full text-gray-600 font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Add seedlings to start building your order</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
