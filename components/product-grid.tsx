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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null) // null = first card expanded by default
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Initialize: first card expanded, scroll to left edge
  useEffect(() => {
    if (trackRef.current && selectedCategory === null) {
      // Scroll to the very left (position 0) so first card is at left edge
      trackRef.current.scrollTo({ left: 0, behavior: 'auto' })
    }
  }, []) // Only run on mount

  const categories = [
    { 
      value: "mango", 
      label: "Mangoes", 
      icon: "🥭",
      description: "Tools that work like you do.",
      bgImage: "https://images.unsplash.com/photo-1605027990121-cf736391f40a?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1605027990121-cf736391f40a?w=400&q=80",
      bgColor: "from-blue-900 to-blue-950"
    },
    { 
      value: "citrus", 
      label: "Citrus", 
      icon: "🍊",
      description: "Create faster, explore new possibilities.",
      bgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80",
      bgColor: "from-purple-800 to-purple-900"
    },
    { 
      value: "avocado", 
      label: "Avocados", 
      icon: "🥑",
      description: "From concept to cut, faster.",
      bgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80",
      bgColor: "from-teal-800 to-teal-900"
    },
    { 
      value: "berries", 
      label: "Berries", 
      icon: "🫐",
      description: "Sweet success in every harvest.",
      bgImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80",
      bgColor: "from-red-900 to-purple-900"
    },
    { 
      value: "tropical", 
      label: "Tropical", 
      icon: "🍍",
      description: "Exotic flavors, premium quality.",
      bgImage: "https://images.unsplash.com/photo-1615485925511-ef4e4c5b0e5e?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1615485925511-ef4e4c5b0e5e?w=400&q=80",
      bgColor: "from-orange-800 to-pink-800"
    },
  ]

  const filteredSeedlings = useMemo(() => {
    if (!selectedCategory) {
      return []
    }
    return seedlings.filter((s) => s.category === selectedCategory)
  }, [selectedCategory])

  // Handle scrolling when cards expand (except for first card on initial load)
  useEffect(() => {
    if (trackRef.current && selectedCategory === null && hoveredIndex !== null && hoveredIndex !== 0) {
      // Only scroll when a card other than the first is being hovered
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Wait for width transition to complete (500ms) before scrolling
      // This prevents cards from sliding away before they expand
      scrollTimeoutRef.current = setTimeout(() => {
        if (trackRef.current && hoveredIndex !== null && hoveredIndex !== 0) {
          const cards = Array.from(trackRef.current.children) as HTMLElement[]
          
          if (cards[hoveredIndex]) {
            const card = cards[hoveredIndex]
            const cardLeft = card.offsetLeft
            const cardWidth = card.offsetWidth
            const trackWidth = trackRef.current.offsetWidth
            
            // For cards after the first, center them in viewport
            const scrollPosition = cardLeft - (trackWidth / 2) + (cardWidth / 2)
            
            // Ensure we don't scroll beyond bounds
            const maxScroll = trackRef.current.scrollWidth - trackWidth
            const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))
            
            trackRef.current.scrollTo({ left: clampedScroll, behavior: 'smooth' })
          }
        }
      }, 550) // Wait for 500ms transition + 50ms buffer
    }
    
    // When hover is removed, scroll back to show first card at left edge
    if (trackRef.current && selectedCategory === null && hoveredIndex === null) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
      }, 550)
    }
    
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [hoveredIndex, selectedCategory, activeIndex])

  const handleDetailsClick = (categoryValue: string, index: number) => {
    setActiveIndex(index)
    setSelectedCategory(categoryValue)
  }

  const handleBack = () => {
    setSelectedCategory(null)
  }

  const handlePrev = () => {
    if (selectedCategory === null) {
      const newIndex = activeIndex > 0 ? activeIndex - 1 : categories.length - 1
      setActiveIndex(newIndex)
      // Scroll to the card (account for spacer div at index 0)
      if (trackRef.current) {
        const cards = Array.from(trackRef.current.children) as HTMLElement[]
        const cardIndex = newIndex + 1 // +1 for spacer
        if (cards[cardIndex]) {
          const card = cards[cardIndex]
          const cardLeft = card.offsetLeft
          const cardWidth = card.offsetWidth
          const trackWidth = trackRef.current.offsetWidth
          const scrollPosition = cardLeft - (trackWidth / 2) + (cardWidth / 2)
          const maxScroll = trackRef.current.scrollWidth - trackWidth
          const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))
          trackRef.current.scrollTo({ left: clampedScroll, behavior: 'smooth' })
        }
      }
    }
  }

  const handleNext = () => {
    if (selectedCategory === null) {
      const newIndex = activeIndex < categories.length - 1 ? activeIndex + 1 : 0
      setActiveIndex(newIndex)
      // Scroll to the card (account for spacer div at index 0)
      if (trackRef.current) {
        const cards = Array.from(trackRef.current.children) as HTMLElement[]
        const cardIndex = newIndex + 1 // +1 for spacer
        if (cards[cardIndex]) {
          const card = cards[cardIndex]
          const cardLeft = card.offsetLeft
          const cardWidth = card.offsetWidth
          const trackWidth = trackRef.current.offsetWidth
          const scrollPosition = cardLeft - (trackWidth / 2) + (cardWidth / 2)
          const maxScroll = trackRef.current.scrollWidth - trackWidth
          const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))
          trackRef.current.scrollTo({ left: clampedScroll, behavior: 'smooth' })
        }
      }
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
    <section id="seedlings" className="relative min-h-screen bg-[#07090d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header with Cart Button */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              SEEDLING <span className="font-light text-gray-400">VARIETIES</span>
              <br />& PRICES
            </h2>
            <p className="text-lg text-gray-400">Premium grafted and tissue-culture varieties</p>
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
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Category Cards Track */}
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-8"
              style={{
                scrollBehavior: 'smooth',
              }}
            >
              {categories.map((category, index) => {
                const categorySeedlings = seedlings.filter((s) => s.category === category.value)
                // Expand on hover, or if it's the first card and nothing is hovered (default state)
                const isExpanded = hoveredIndex === index || (hoveredIndex === null && index === 0)
                const isActive = activeIndex === index
                
                return (
                  <div
                    key={category.value}
                    onMouseEnter={() => {
                      // Set hover state first to trigger expansion
                      setHoveredIndex(index)
                      // Update active index after a small delay to allow expansion
                      setTimeout(() => {
                        setActiveIndex(index)
                      }, 100)
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null)
                    }}
                    className={`relative flex-shrink-0 transition-all duration-500 ease-out ${
                      isExpanded ? 'w-[60vw] min-w-[40rem]' : 'w-[5rem]'
                    }`}
                    style={{
                      willChange: 'width', // Optimize for width transitions
                    }}
                  >
                    <div
                      className={`h-[32rem] rounded-2xl overflow-hidden transition-all duration-500 relative ${
                        isExpanded
                          ? 'shadow-2xl'
                          : 'shadow-lg'
                      }`}
                      style={{
                        backgroundImage: `url(${category.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        willChange: 'transform', // Optimize for transitions
                      }}
                    >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-90`}></div>
                      
                      {/* Collapsed State - Vertical Text */}
                      {!isExpanded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 
                            className="text-white text-2xl font-bold"
                            style={{ 
                              writingMode: 'vertical-rl',
                              textOrientation: 'upright',
                              transform: 'none'
                            }}
                          >
                            {category.label}
                          </h3>
                        </div>
                      )}

                      {/* Expanded State - Full Content */}
                      {isExpanded && (
                        <div className="relative h-full flex flex-col p-8 text-white">
                          {/* Foreground Image */}
                          <div className="relative mb-6 flex-shrink-0">
                            <div className="w-64 h-48 rounded-xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm">
                              <img
                                src={category.fgImage}
                                alt={category.label}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-5xl font-bold mb-4">{category.label}</h3>
                              <p className="text-lg text-white/90 mb-6">{category.description}</p>
                            </div>

                            {/* Details Button */}
                            <button
                              onClick={() => handleDetailsClick(category.value, index)}
                              className="bg-[#ff6b35] hover:bg-[#ff8555] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg self-start"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              {/* Right padding to ensure last card is fully visible */}
              <div className="flex-shrink-0 w-4"></div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {categories.map((_, index) => {
                const isActive = activeIndex === index
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
                      // Scroll to the card when dot is clicked (account for spacer div at index 0)
                      if (trackRef.current) {
                        const cards = Array.from(trackRef.current.children) as HTMLElement[]
                        const cardIndex = index + 1 // +1 for spacer
                        if (cards[cardIndex]) {
                          const card = cards[cardIndex]
                          const cardLeft = card.offsetLeft
                          const cardWidth = card.offsetWidth
                          const trackWidth = trackRef.current.offsetWidth
                          const scrollPosition = cardLeft - (trackWidth / 2) + (cardWidth / 2)
                          const maxScroll = trackRef.current.scrollWidth - trackWidth
                          const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))
                          trackRef.current.scrollTo({ left: clampedScroll, behavior: 'smooth' })
                        }
                      }
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#ff6b35] w-8 h-2' 
                        : 'bg-gray-600 w-2 h-2 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to ${categories[index].label}`}
                  />
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
