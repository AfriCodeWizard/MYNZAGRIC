"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import ProductCard from "./product-card"
import { seedlings } from "@/lib/seedlings-data"
import { X, ShoppingBag, Plus, Minus, ArrowLeft, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"

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
  const [isMobile, setIsMobile] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Initialize: first card expanded, scroll to left edge (desktop only)
  useEffect(() => {
    if (trackRef.current && selectedCategory === null && !isMobile) {
      // Scroll to the very left (position 0) so first card is at left edge
      trackRef.current.scrollTo({ left: 0, behavior: 'auto' })
    }
  }, [isMobile]) // Run when mobile state changes

  const categories = [
    { 
      value: "mango", 
      label: "Mangoes", 
      icon: "🥭",
      description: "Choose from 5 premium grafted varieties including Tommy, Apple, Van Dyke, Ngowe, and Alphonso mangoes. Fast-growing, high-yield trees that start fruiting in 2-3 years. Perfect for commercial farming or home gardens.",
      bgImage: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800",
      fgImage: "https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=480",
      bgColor: "from-blue-900 to-blue-950"
    },
    { 
      value: "citrus", 
      label: "Citrus", 
      icon: "🍊",
      description: "Explore 12 diverse citrus varieties from sweet Pixies and Valencia oranges to tangy Kumquats and Tangerines. Disease-resistant, grafted seedlings ready for your orchard. Fresh, vitamin-rich fruits year after year.",
      bgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=480&q=80&auto=format&fit=crop",
      bgColor: "from-purple-800 to-purple-900"
    },
    { 
      value: "avocado", 
      label: "Avocados", 
      icon: "🥑",
      description: "Premium Hass and Fuerte avocado varieties. High-value crop with excellent market demand. Start harvesting delicious, nutrient-rich avocados in 2-3 years. Perfect for export and local markets.",
      bgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      fgImage: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=480&q=80&auto=format&fit=crop",
      bgColor: "from-teal-800 to-teal-900"
    },
    { 
      value: "berries", 
      label: "Berries", 
      icon: "🫐",
      description: "Sweet success with 3 premium berry varieties. High antioxidant content, perfect for health-conscious markets. Fast-growing plants ideal for small-scale and commercial farming. Fresh berries at your fingertips.",
      bgImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&auto=format&fit=crop",
      fgImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=480&q=80&auto=format&fit=crop",
      bgColor: "from-red-900 to-purple-900"
    },
    { 
      value: "tropical", 
      label: "Tropical", 
      icon: "🍍",
      description: "Discover 33 exotic tropical fruit varieties including passion fruit, guavas, papayas, and more! Premium tissue-culture and grafted seedlings. Transform your farm with diverse, profitable tropical fruits loved by local and export markets.",
      bgImage: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&auto=format&fit=crop",
      fgImage: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=480&q=80&auto=format&fit=crop",
      bgColor: "from-orange-800 to-pink-800"
    },
  ]

  const filteredSeedlings = useMemo(() => {
    if (!selectedCategory) {
      return []
    }
    return seedlings.filter((s) => s.category === selectedCategory)
  }, [selectedCategory])

  // Handle scrolling when active card changes - smooth transitions (desktop only)
  useEffect(() => {
    if (trackRef.current && selectedCategory === null && !isMobile) {
      // Small delay to allow flex-basis transition to start
      const timeoutId = setTimeout(() => {
        if (trackRef.current) {
          const cards = Array.from(trackRef.current.children) as HTMLElement[]
          
          if (cards[activeIndex]) {
            const card = cards[activeIndex]
            const cardLeft = card.offsetLeft
            const cardWidth = card.offsetWidth
            const trackWidth = trackRef.current.offsetWidth
            const trackScrollLeft = trackRef.current.scrollLeft
            
            // Calculate scroll position to center the active card
            const scrollPosition = cardLeft - (trackWidth / 2) + (cardWidth / 2)
            const maxScroll = trackRef.current.scrollWidth - trackWidth
            const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))
            
            // Only scroll if the card is not already visible
            const cardRight = cardLeft + cardWidth
            const visibleLeft = trackScrollLeft
            const visibleRight = trackScrollLeft + trackWidth
            
            if (cardLeft < visibleLeft || cardRight > visibleRight) {
              trackRef.current.scrollTo({ left: clampedScroll, behavior: 'smooth' })
            }
          }
        }
      }, 50) // Small delay to let flex-basis transition start
      
      return () => clearTimeout(timeoutId)
    }
  }, [activeIndex, selectedCategory, isMobile])

  // Handle scrolling to active card on mobile (vertical scroll)
  useEffect(() => {
    if (trackRef.current && selectedCategory === null && isMobile) {
      const timeoutId = setTimeout(() => {
        if (trackRef.current) {
          const cards = Array.from(trackRef.current.children) as HTMLElement[]
          
          if (cards[activeIndex]) {
            const card = cards[activeIndex]
            const cardTop = card.offsetTop
            const cardHeight = card.offsetHeight
            const trackHeight = trackRef.current.offsetHeight
            const trackScrollTop = trackRef.current.scrollTop
            
            // Calculate scroll position to center the active card
            const scrollPosition = cardTop - (trackHeight / 2) + (cardHeight / 2)
            const maxScroll = trackRef.current.scrollHeight - trackHeight
            const clampedScroll = Math.max(0, Math.min(scrollPosition, maxScroll))
            
            // Only scroll if the card is not already visible
            const cardBottom = cardTop + cardHeight
            const visibleTop = trackScrollTop
            const visibleBottom = trackScrollTop + trackHeight
            
            if (cardTop < visibleTop || cardBottom > visibleBottom) {
              trackRef.current.scrollTo({ top: clampedScroll, behavior: 'smooth' })
            }
          }
        }
      }, 50)
      
      return () => clearTimeout(timeoutId)
    }
  }, [activeIndex, selectedCategory, isMobile])

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
    }
  }

  const handleNext = () => {
    if (selectedCategory === null) {
      const newIndex = activeIndex < categories.length - 1 ? activeIndex + 1 : 0
      setActiveIndex(newIndex)
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
      .map((item, index) => `${index + 1}. ${item.name}\n   Quantity: ${item.quantity}\n   Price: KES ${(item.price * item.quantity).toLocaleString()}`)
      .join("\n\n")
    
    const message = `🌱 *ORDER REQUEST - MYNZAGRIC* 🌱

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 *ORDER ITEMS:*

${items}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 *ORDER SUMMARY:*
Subtotal: KES ${totalPrice.toLocaleString()}
Delivery Fee: *Pending upon order confirmation*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Please confirm availability and provide delivery details.

Thank you! 🙏`
    
    return encodeURIComponent(message)
  }

  return (
    <section id="seedlings" className="relative min-h-screen bg-[#07090d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Section Header with Cart Button */}
        <div className="flex flex-col gap-4 mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              SEEDLING <span className="font-light text-gray-400">VARIETIES</span>
              <br />& PRICES
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mt-2">Premium grafted and tissue-culture varieties</p>
          </div>

          {/* Cart and Scroll Controls - Same horizontal line on mobile, cart right on desktop */}
          <div className="flex items-center gap-3 sm:justify-end">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl z-10"
              title="Bulk Order Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Scroll Controls - On right side, same line as cart */}
            {isMobile && (
              <div className="flex flex-col gap-2 z-30 ml-auto">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full transition text-white shadow-lg"
                  aria-label="Scroll Up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full transition text-white shadow-lg"
                  aria-label="Scroll Down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category View - Full Section */}
        {selectedCategory === null && (
          <div className="relative">
            {/* Navigation Controls - Hidden on mobile, visible on desktop */}
            <div className="hidden sm:flex items-center justify-between mb-6 sm:mb-8">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white z-20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white z-20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>


            {/* Category Cards Track - Vertical stack on mobile, horizontal scroll on desktop */}
            <div
              ref={trackRef}
              className={`gap-4 sm:gap-5 pb-10 ${
                isMobile 
                  ? 'flex flex-col' 
                  : 'flex overflow-x-auto scrollbar-hide'
              }`}
              style={{
                scrollBehavior: 'smooth',
                scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
              }}
            >
              {categories.map((category, index) => {
                const categorySeedlings = seedlings.filter((s) => s.category === category.value)
                const isActive = activeIndex === index
                
                return (
                  <div
                    key={category.value}
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setActiveIndex(index)
                      }
                    }}
                    onClick={() => {
                      if (isMobile) {
                        setActiveIndex(index)
                      }
                    }}
                    data-category-card={category.value}
                    className={`relative snap-center ${
                      isMobile ? 'w-full' : 'flex-shrink-0'
                    }`}
                    style={{
                      flexBasis: isMobile 
                        ? 'auto' 
                        : (isActive ? '60vw' : '5rem'),
                      minWidth: isMobile 
                        ? '100%' 
                        : (isActive ? '40rem' : '5rem'),
                      height: isMobile 
                        ? (isActive ? 'auto' : '4rem')
                        : 'auto',
                      transition: isMobile
                        ? 'height 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        : 'flex-basis 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), min-width 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transform: isActive ? (isMobile ? 'translateY(0)' : 'translateY(-6px)') : 'translateY(0)',
                      willChange: isMobile ? 'height, transform' : 'flex-basis, transform',
                    }}
                  >
                    <div
                      className={`rounded-2xl overflow-hidden relative cursor-pointer ${
                        isMobile 
                          ? (isActive ? 'min-h-[20rem]' : 'h-16')
                          : 'h-[20rem] sm:h-[24rem] md:h-[26rem]'
                      }`}
                      style={{
                        boxShadow: isActive ? '0 18px 55px rgba(0, 0, 0, 0.45)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'box-shadow 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    >
                      {/* Background Image */}
                      <img
                        src={category.bgImage}
                        alt={category.label}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                        style={{
                          filter: isActive ? 'brightness(0.9) saturate(100%)' : 'brightness(0.75) saturate(75%)',
                          transform: isActive ? 'scale(1.06)' : 'scale(1)',
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Fallback to a different mango image if current one fails
                          if (category.value === 'mango') {
                            target.src = 'https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=800';
                          }
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div 
                        className="absolute inset-0 z-[1]"
                        style={{ 
                          background: `linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.7) 100%)`,
                        }}
                      ></div>
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} z-[1]`}
                        style={{
                          opacity: 0.75, // Reduced from 0.9 to 0.75 for 15% more visibility
                        }}
                      ></div>
                      
                      {/* Content Container */}
                      <div 
                        className={`absolute inset-0 flex z-10 ${
                          isActive 
                            ? (isMobile 
                                ? 'flex-row items-center justify-start gap-3' 
                                : 'flex-col sm:flex-row items-center sm:items-center sm:justify-start gap-3 sm:gap-4')
                            : 'flex-col items-center justify-center'
                        }`}
                        style={{
                          transition: 'all 0.3s ease',
                          padding: isActive 
                            ? (isMobile ? '1rem' : '1.25rem 1.25rem 1.25rem 3.125rem')
                            : (isMobile ? '0.5rem' : '0'),
                        }}
                      >
                        {/* Foreground Image - Only visible when active */}
                        {isActive && (
                          <div className={`rounded-lg overflow-hidden shadow-lg flex-shrink-0 ${
                            isMobile 
                              ? 'w-[100px] h-[180px]' 
                              : 'w-[100px] h-[200px] sm:w-[120px] sm:h-[240px] md:w-[133px] md:h-[269px]'
                          }`}>
                            <img
                              src={category.fgImage}
                              alt={category.label}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Fallback to a different mango image if current one fails
                                if (category.value === 'mango') {
                                  target.src = 'https://images.pexels.com/photos/16620442/pexels-photo-16620442.jpeg?auto=compress&cs=tinysrgb&w=480';
                                }
                              }}
                            />
                          </div>
                        )}

                        {/* Text Content */}
                        <div className={`flex flex-col ${isActive ? (isMobile ? 'items-start flex-1' : 'items-center sm:items-start') : 'items-center'} ${isActive && isMobile ? 'flex-1' : ''}`}>
                          <h3 
                            className={`text-white font-bold ${
                              isActive 
                                ? (isMobile ? 'text-xl mb-2 text-left' : 'text-2xl sm:text-3xl md:text-4xl mb-2 text-center sm:text-left')
                                : (isMobile ? 'text-lg' : 'text-lg sm:text-xl')
                            }`}
                            style={{
                              writingMode: isActive ? 'horizontal-tb' : (isMobile ? 'horizontal-tb' : 'vertical-rl'),
                              transform: isActive ? 'none' : (isMobile ? 'none' : 'rotate(180deg)'),
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {category.label}
                          </h3>
                          
                          {isActive && (
                            <>
                              <p className={`text-xs sm:text-base text-gray-200 mb-2 sm:mb-4 leading-relaxed ${
                                isMobile ? 'text-left' : 'max-w-[20rem] text-center sm:text-left'
                              }`}>
                                {category.description}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDetailsClick(category.value, index)
                                }}
                                className={`bg-[#ff6b35] hover:bg-[#ff824f] active:bg-[#ff5a25] text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-5 rounded-full transition-all duration-300 text-xs sm:text-sm z-20 relative ${
                                  isMobile ? 'w-auto self-start' : 'w-full sm:w-auto'
                                }`}
                              >
                                Order Now
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* Right padding to ensure last card is fully visible - Only on desktop */}
              {!isMobile && <div className="flex-shrink-0 w-4"></div>}
          </div>

            {/* Pagination Dots - Hidden on mobile, visible on desktop */}
            <div className="hidden sm:flex justify-center gap-2 mt-8">
              {categories.map((_, index) => {
                const isActive = activeIndex === index
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
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
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold text-gray-900">KES {totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                        <div className="flex flex-col">
                          <span className="text-gray-600">Delivery Fee:</span>
                          <span className="text-xs text-gray-500 italic">Pending upon order confirmation</span>
                        </div>
                        <span className="font-semibold text-gray-500">—</span>
                      </div>
                      <div className="flex justify-between items-center border-t-2 border-green-200 pt-3 mt-2">
                        <span className="font-bold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-green-600">KES {totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/254713764658?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition text-center block shadow-md hover:shadow-lg"
                    >
                      📱 Order on WhatsApp
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
