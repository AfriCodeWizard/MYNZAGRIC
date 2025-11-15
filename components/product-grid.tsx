"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import ProductCard from "./product-card"
import { seedlings } from "@/lib/seedlings-data"
import { X, ShoppingBag, Plus, Minus, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const categories = [
    { value: "mango", label: "Mangoes", icon: "🥭" },
    { value: "citrus", label: "Citrus", icon: "🍊" },
    { value: "avocado", label: "Avocados", icon: "🥑" },
    { value: "berries", label: "Berries", icon: "🫐" },
    { value: "tropical", label: "Tropical", icon: "🍍" },
  ]

  const filteredSeedlings = useMemo(() => {
    if (!selectedCategory) {
      return []
    }
    return seedlings.filter((s) => s.category === selectedCategory)
  }, [selectedCategory])

  // Center the active card
  useEffect(() => {
    if (trackRef.current && selectedCategory === null) {
      const cards = trackRef.current.children
      if (cards[activeIndex]) {
        const card = cards[activeIndex] as HTMLElement
        const cardWidth = card.offsetWidth
        const trackWidth = trackRef.current.offsetWidth
        const scrollPosition = card.offsetLeft - (trackWidth / 2) + (cardWidth / 2)
        trackRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' })
      }
    }
  }, [activeIndex, selectedCategory])

  const handleCategoryClick = (categoryValue: string, index: number) => {
    setActiveIndex(index)
    setSelectedCategory(categoryValue)
  }

  const handleBack = () => {
    setSelectedCategory(null)
  }

  const handlePrev = () => {
    if (selectedCategory === null) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : categories.length - 1))
    }
  }

  const handleNext = () => {
    if (selectedCategory === null) {
      setActiveIndex((prev) => (prev < categories.length - 1 ? prev + 1 : 0))
    }
  }

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


  const generateWhatsAppMessage = () => {
    const items = cart
      .map((item) => `${item.name} (Qty: ${item.quantity}) - KES ${item.price * item.quantity}`)
      .join("\n")
    const message = `Hi Mynzagric, I'd like to order:\n\n${items}\n\nTotal: KES ${totalPrice}`
    return encodeURIComponent(message)
  }

  return (
    <section id="seedlings" className="relative min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
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
            className="relative p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl z-10"
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

        {/* Category View - Full Section */}
        {selectedCategory === null && (
          <div className="relative">
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handlePrev}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Category Cards Track */}
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
              }}
            >
              {categories.map((category, index) => {
                const categorySeedlings = seedlings.filter((s) => s.category === category.value)
                const isActive = activeIndex === index
                return (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryClick(category.value, index)}
                    className={`group relative flex-shrink-0 transition-all duration-500 ease-out snap-center ${
                      isActive ? 'w-[30rem] scale-105' : 'w-[5rem]'
                    }`}
                  >
                    <div
                      className={`h-40 rounded-2xl p-6 flex items-center justify-between transition-all duration-500 ${
                        isActive
                          ? 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-2xl'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={`text-5xl flex-shrink-0 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`}>
                          {category.icon}
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                          <h3 className="text-2xl font-bold mb-2 whitespace-nowrap">{category.label}</h3>
                          <p className="text-sm opacity-90 whitespace-nowrap">
                            {categorySeedlings.length} {categorySeedlings.length === 1 ? 'variety' : 'varieties'} available
                          </p>
                        </div>
                      </div>
                      {isActive && (
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-3 h-3 rounded-full bg-white/30 animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Category Items View - Full Page Transition */}
        {selectedCategory !== null && (
          <div className="absolute inset-0 bg-white z-20 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
              {/* Back Button and Header */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Categories</span>
                </button>
                <div className="text-right">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {categories.find((c) => c.value === selectedCategory)?.label} Varieties
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {filteredSeedlings.length} {filteredSeedlings.length === 1 ? 'item' : 'items'} available
                  </p>
                </div>
              </div>

              {/* Product Grid */}
              {filteredSeedlings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSeedlings.map((seedling) => (
                    <ProductCard key={seedling.id} seedling={seedling} onAddToCart={addToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 mb-2">No seedlings found in this category</p>
                  <button
                    onClick={handleBack}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Back to Categories
                  </button>
                </div>
              )}
            </div>
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
