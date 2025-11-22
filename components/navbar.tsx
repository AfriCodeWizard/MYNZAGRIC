"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, ShoppingBag, Plus, Minus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { seedlings } from "@/lib/seedlings-data"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCareGuidesOpen, setIsCareGuidesOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverLightSection, setIsOverLightSection] = useState(false)
  const [cartAnimation, setCartAnimation] = useState(false)
  const [deliveryLocation, setDeliveryLocation] = useState<string>("")
  const [isWhatsAppInteracting, setIsWhatsAppInteracting] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const productsDropdownRef = useRef<HTMLDivElement>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const cartContentRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const whatsappButtonRef = useRef<HTMLDivElement>(null)
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice, showCartNotification } = useCart()
  

  // Cart animation effect - enhanced with longer duration
  useEffect(() => {
    if (showCartNotification && totalItems > 0) {
      setCartAnimation(true)
      const timer = setTimeout(() => setCartAnimation(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [showCartNotification, totalItems])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCareGuidesOpen(false)
        if (activeDropdown === "care-guides") {
          setActiveDropdown(null)
        }
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
        if (activeDropdown === "products") {
          setActiveDropdown(null)
        }
      }
      // Cart closing logic - ONLY handle desktop cart here
      // Mobile cart closing is handled EXCLUSIVELY by backdrop onClick handler
      const isMobile = window.innerWidth < 1024 // lg breakpoint
      
      // COMPLETELY skip mobile cart handling - mobile uses backdrop handler only
      if (isMobile) {
        // Don't handle mobile cart at all - let backdrop handler do it
        return
      }
      
      // Desktop cart handling only
      const isDesktopCart = cartRef.current?.contains(event.target as Node)
      if (cartRef.current && !isDesktopCart) {
        setIsCartOpen(false)
      }
    }

    // Attach listener for dropdowns and cart (cart logic handles mobile/desktop internally)
    if (isCareGuidesOpen || isProductsOpen || isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCareGuidesOpen, isProductsOpen, isCartOpen, activeDropdown])

  // Generate WhatsApp message for cart
  const generateWhatsAppMessage = () => {
    const itemsText = cart
      .map((item) => `• ${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`)
      .join("\n")
    const message = `*BULK ORDER REQUEST*

─────────────────────────

*ORDER ITEMS:*
${itemsText}

*DELIVERY LOCATION:*
${deliveryLocation}

*TOTAL AMOUNT:*
KES ${totalPrice.toLocaleString()}

─────────────────────────

I would like to place this bulk order. Please confirm availability and delivery details.

Thank you!`
    return encodeURIComponent(message)
  }

  const kenyanCounties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
    "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
    "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
    "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
    "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River",
    "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ].sort()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setIsCareGuidesOpen(false)
    setIsProductsOpen(false)
  }, [])

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Show background when scrolled even a little bit (better UX)
      setIsScrolled(scrollY > 10)

      // Check if navbar is over light sections
      const lightSectionIds = ['seedlings', 'care-guides', 'contact']
      const navbarHeight = 80 // Approximate navbar height
      
      let overLightSection = false
      lightSectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if navbar area overlaps with light section
          if (rect.top < navbarHeight && rect.bottom > 0) {
            overLightSection = true
          }
        }
      })

      setIsOverLightSection(overLightSection)
    }

    // Use requestAnimationFrame for smoother updates
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Check initial state after a brief delay to ensure DOM is ready
    setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      action()
    }
  }


  // Determine navbar background based on scroll and section
  const shouldShowSolidBackground = isScrolled || isOverLightSection

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ 
        pointerEvents: "none", 
        top: 0,
        position: 'fixed',
      }}
    >
      {/* Wrapper to maintain consistent top spacing */}
      <div style={{ paddingTop: '1rem', width: '100%', height: '100%', position: 'relative' }}>
        {/* Animated Background Layer - Drops from top with padding */}
        <div
          className={cn(
            "absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 transition-all duration-500 ease-in-out",
            shouldShowSolidBackground
              ? "bg-white shadow-lg opacity-100 translate-y-0 rounded-[10px]"
              : "bg-white opacity-0 -translate-y-full shadow-none rounded-[10px]"
          )}
          style={{
            top: '1rem',
            transition: "opacity 500ms ease-in-out, transform 500ms ease-in-out, box-shadow 500ms ease-in-out",
            pointerEvents: "none",
            overflow: "visible",
            height: "calc(100% - 1rem)",
            zIndex: 1,
          }}
        />

        {/* Navbar Content - Always visible on transparent background */}
        <nav 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" 
          aria-label="Main navigation" 
          style={{ 
            overflow: "visible", 
            pointerEvents: "auto",
          }}
        >
        <div 
          className="flex justify-between items-center h-16 md:h-20 relative" 
          style={{ 
            overflow: "visible",
            marginTop: 0,
            top: 0,
          }}
        >
          {/* Logo */}
          <div className="flex-shrink-0 z-50 relative">
            <Link
              href="/"
              className={cn(
                "flex items-center transition-opacity duration-300 hover:opacity-80",
                "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded relative z-10"
              )}
              aria-label="Mynzagric Home"
            >
              <div className="relative h-14 md:h-[70px] w-[180px] md:w-[200px]">
                {/* White Logo - Visible when navbar is transparent */}
                <Image
                  src="/mynzAgric logoOficial (white).webp"
                  alt="Mynzagric Logo"
                  width={180}
                  height={50}
                  className={cn(
                    "absolute inset-0 h-full w-auto transition-opacity duration-300",
                    shouldShowSolidBackground ? "opacity-0" : "opacity-100"
                  )}
                  priority
                  style={{ 
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                    filter: 'brightness(1.3) contrast(1.2)',
                  }}
                />
                {/* Color Logo - Visible when navbar is shown */}
                <Image
                  src="/mynzAgric logoOficial (color).webp"
                  alt="Mynzagric Logo"
                  width={180}
                  height={50}
                  className={cn(
                    "absolute inset-0 h-full w-auto transition-opacity duration-300",
                    shouldShowSolidBackground ? "opacity-100" : "opacity-0"
                  )}
                  priority
                  style={{ 
                    objectFit: 'contain',
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 space-x-1">
            <NavLink href="#about" label="About" shouldShowSolidBackground={shouldShowSolidBackground} />

            {/* Products Dropdown */}
            <div
              ref={productsDropdownRef}
              className="relative"
              onMouseEnter={() => {
                setIsProductsOpen(true)
                setActiveDropdown("products")
              }}
              onMouseLeave={(e) => {
                const relatedTarget = e.relatedTarget as HTMLElement | null
                if (relatedTarget && productsDropdownRef.current?.contains(relatedTarget)) {
                  return
                }
                setIsProductsOpen(false)
                setActiveDropdown(null)
              }}
            >
              <button
                className={cn(
                  "relative px-4 py-2 uppercase text-sm font-medium transition-colors duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded",
                  shouldShowSolidBackground
                    ? "text-gray-900 hover:text-green-600"
                    : "text-white hover:text-green-300"
                )}
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
                aria-label="Products Menu"
                onKeyDown={(e) => handleKeyDown(e, () => setIsProductsOpen(!isProductsOpen))}
              >
                Products
                <ChevronDown
                  className={cn(
                    "inline-block ml-2 w-4 h-4 transition-all duration-300",
                    isProductsOpen && "rotate-180",
                    shouldShowSolidBackground ? "text-gray-900" : "text-white"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 ease-out",
                    "transform -translate-x-1/2",
                    isProductsOpen ? "w-full" : "w-0",
                    shouldShowSolidBackground ? "bg-green-600" : "bg-green-300"
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Products Dropdown Menu */}
              {isProductsOpen && (
                <>
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 h-2"
                    style={{ zIndex: 9998 }}
                    onMouseEnter={() => {
                      setIsProductsOpen(true)
                      setActiveDropdown("products")
                    }}
                  />
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                    onMouseEnter={() => {
                      setIsProductsOpen(true)
                      setActiveDropdown("products")
                    }}
                    onMouseLeave={() => {
                      setIsProductsOpen(false)
                      setActiveDropdown(null)
                    }}
                    style={{ zIndex: 9999 }}
                  >
                    <div className="p-2">
                      <Link
                        href="#seedlings"
                        className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors"
                        role="menuitem"
                        onClick={() => {
                          setIsProductsOpen(false)
                          setActiveDropdown(null)
                        }}
                      >
                        Seedlings
                      </Link>
                      <div className="mt-1">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Frutopia Value Pack
                        </div>
                        <Link
                          href="#frutopia"
                          className="block px-6 py-2 text-sm text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors"
                          role="menuitem"
                          onClick={() => {
                            setIsProductsOpen(false)
                            setActiveDropdown(null)
                          }}
                        >
                          All Value Packs
                        </Link>
                        <Link
                          href="#frutopia"
                          className="block px-6 py-2 text-sm text-gray-700 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors"
                          role="menuitem"
                          onClick={() => {
                            setIsProductsOpen(false)
                            setActiveDropdown(null)
                          }}
                        >
                          Drip Irrigation Kits
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Care Guides Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => {
                setIsCareGuidesOpen(true)
                setActiveDropdown("care-guides")
              }}
              onMouseLeave={(e) => {
                // Check if mouse is moving to dropdown menu
                const relatedTarget = e.relatedTarget as HTMLElement | null
                if (relatedTarget && dropdownRef.current?.contains(relatedTarget)) {
                  return // Don't close if moving to dropdown
                }
                setIsCareGuidesOpen(false)
                setActiveDropdown(null)
              }}
            >
              <button
                className={cn(
                  "relative px-4 py-2 uppercase text-sm font-medium transition-colors duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded",
                  shouldShowSolidBackground
                    ? "text-gray-900 hover:text-green-600"
                    : "text-white hover:text-green-300"
                )}
                aria-expanded={isCareGuidesOpen}
                aria-haspopup="true"
                aria-label="Care Guides Menu"
                onKeyDown={(e) => handleKeyDown(e, () => setIsCareGuidesOpen(!isCareGuidesOpen))}
              >
                Care Guides
                <ChevronDown
                  className={cn(
                    "inline-block ml-2 w-4 h-4 transition-all duration-300",
                    isCareGuidesOpen && "rotate-180",
                    shouldShowSolidBackground ? "text-gray-900" : "text-white"
                  )}
                  aria-hidden="true"
                />
                {/* Animated underline - expands from center on hover or when open */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 ease-out",
                    "transform -translate-x-1/2",
                    isCareGuidesOpen ? "w-full" : "w-0",
                    shouldShowSolidBackground ? "bg-green-600" : "bg-green-300"
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu - Centered below button, stays open on hover */}
              {isCareGuidesOpen && (
                <>
                  {/* Invisible bridge area to prevent dropdown from closing when moving mouse */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-96 h-2"
                    style={{
                      zIndex: 9998,
                    }}
                    onMouseEnter={() => {
                      setIsCareGuidesOpen(true)
                      setActiveDropdown("care-guides")
                    }}
                  />
                  {/* Dropdown Menu */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-100"
                    role="menu"
                    aria-orientation="vertical"
                    onMouseEnter={() => {
                      setIsCareGuidesOpen(true)
                      setActiveDropdown("care-guides")
                    }}
                    onMouseLeave={() => {
                      setIsCareGuidesOpen(false)
                      setActiveDropdown(null)
                    }}
                    style={{
                      zIndex: 9999,
                    }}
                  >
                    <div className="p-4">
                      <div className="mb-3 pb-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          Plant Care Guides
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                        {seedlings.map((seedling) => (
                          <Link
                            key={seedling.id}
                            href={`/plant-care/${seedling.id}`}
                            className={cn(
                              "block px-3 py-2 text-sm text-gray-700 rounded-md",
                              "transition-all duration-200",
                              "hover:bg-green-50 hover:text-green-700",
                              "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
                            )}
                            role="menuitem"
                            onClick={() => {
                              setIsCareGuidesOpen(false)
                              setActiveDropdown(null)
                            }}
                          >
                            {seedling.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <NavLink href="#contact" label="Contact" shouldShowSolidBackground={shouldShowSolidBackground} />
          </div>

          {/* Right side - Cart Icon - Only visible when items exist */}
          <div className="flex items-center">
            {totalItems > 0 && (
              <div className="hidden lg:flex items-center ml-4 z-50 relative" style={{
                animation: 'slideInRight 0.5s ease-out'
              }}>
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className={cn(
                    "relative p-2.5 rounded-full transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                    cartAnimation && "animate-bounce",
                    shouldShowSolidBackground
                      ? "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                  )}
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {/* Item count badge with colorful animation */}
                  <span className={cn(
                    "absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full",
                    "w-5 h-5 flex items-center justify-center shadow-lg border-2 border-white",
                    cartAnimation && "scale-150 animate-pulse"
                  )}>
                    {totalItems}
                  </span>
                  {/* Multiple colorful pulse rings when item added */}
                  {showCartNotification && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                      <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-50" style={{ animationDelay: '0.2s' }} />
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" style={{ animationDelay: '0.4s' }} />
                    </>
                  )}
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 hover:opacity-20 blur-md transition-opacity duration-300" />
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-100 z-[10000] flex flex-col"
                    style={{ 
                      height: 'calc(100vh - 100px)',
                      maxWidth: 'calc(100vw - 32px)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                      <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsCartOpen(false)
                        }}
                        className="text-gray-500 hover:text-gray-700 transition"
                        aria-label="Close cart"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {cart.length > 0 ? (
                      <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                                <p className="text-sm text-green-600 font-bold">KES {item.price.toLocaleString()}</p>
                              </div>
                              <div className="flex items-center gap-2 bg-white rounded-lg border border-green-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateQuantity(item.id, item.quantity - 1)
                                  }}
                                  className="p-1 hover:bg-gray-100 transition"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-4 h-4 text-green-600" />
                                </button>
                                <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateQuantity(item.id, item.quantity + 1)
                                  }}
                                  className="p-1 hover:bg-gray-100 transition"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-4 h-4 text-green-600" />
                                </button>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFromCart(item.id)
                                }}
                                className="text-red-500 hover:text-red-700 transition p-1"
                                aria-label="Remove item"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 p-4 space-y-4 overflow-visible flex-shrink-0 bg-white">
                          <div className="relative z-[10001]">
                            <label htmlFor="delivery-location-nav" className="block text-sm font-medium text-gray-700 mb-2">
                              Delivery Location <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="delivery-location-nav"
                              value={deliveryLocation}
                              onChange={(e) => {
                                e.stopPropagation()
                                setDeliveryLocation(e.target.value)
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white text-sm relative z-[10001]"
                              required
                              style={{ position: 'relative', zIndex: 10001 }}
                            >
                              <option value="">Select County</option>
                              {kenyanCounties.map((county) => (
                                <option key={county} value={county}>
                                  {county}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2 border-t border-gray-200 pt-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-700">Delivery Fee:</span>
                              <span className="text-sm font-bold text-red-600">Pending order confirmation</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-gray-900">Total:</span>
                              <span className="text-xl font-bold text-green-600">KES {totalPrice.toLocaleString()}</span>
                            </div>
                          </div>
                          <a
                            href={deliveryLocation ? `https://wa.me/254713764658?text=${generateWhatsAppMessage()}` : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!deliveryLocation) {
                                e.preventDefault()
                                alert("Please select a delivery location")
                                return
                              }
                            }}
                            className={cn(
                              "w-full font-bold py-3 rounded-lg transition text-center block shadow-md hover:shadow-lg",
                              deliveryLocation
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                            )}
                          >
                            📱 Order on WhatsApp
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              clearCart()
                              setIsCartOpen(false)
                            }}
                            className="w-full text-gray-600 font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">Your cart is empty</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              </div>
            )}
            
            {/* Mobile Cart Icon - Only visible when items exist */}
            {totalItems > 0 && (
              <div className="lg:hidden ml-2 relative z-50" style={{
                animation: 'slideInRight 0.5s ease-out'
              }}>
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className={cn(
                    "relative p-2.5 rounded-full transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                    cartAnimation && "animate-bounce",
                    shouldShowSolidBackground
                      ? "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                  )}
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className={cn(
                    "absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full",
                    "w-5 h-5 flex items-center justify-center shadow-lg border-2 border-white",
                    cartAnimation && "scale-150 animate-pulse"
                  )}>
                    {totalItems}
                  </span>
                  {showCartNotification && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                      <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-50" style={{ animationDelay: '0.2s' }} />
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" style={{ animationDelay: '0.4s' }} />
                    </>
                  )}
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 hover:opacity-20 blur-md transition-opacity duration-300" />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent",
                shouldShowSolidBackground
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-screen opacity-100 pb-4" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isOpen}
        >
          <nav className={cn(
            "py-4 space-y-1 backdrop-blur-md rounded-lg mt-2",
            shouldShowSolidBackground ? "bg-white/95" : "bg-black/60"
          )}>
            <MobileNavLink href="#about" label="About" onClick={() => setIsOpen(false)} shouldShowSolidBackground={shouldShowSolidBackground} />

            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 uppercase text-sm font-medium rounded-md transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                  shouldShowSolidBackground
                    ? "text-gray-900 hover:bg-gray-100 focus:ring-offset-white"
                    : "text-white hover:bg-white/10 focus:ring-offset-black/60"
                )}
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isProductsOpen && "rotate-180",
                    shouldShowSolidBackground ? "text-gray-900" : "text-white"
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isProductsOpen ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="pl-4 pr-2 pt-2 space-y-1">
                  <MobileNavLink href="#seedlings" label="Seedlings" onClick={() => { setIsOpen(false); setIsProductsOpen(false); }} shouldShowSolidBackground={shouldShowSolidBackground} />
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide"
                    style={shouldShowSolidBackground ? { color: '#6b7280' } : { color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    Frutopia Value Pack
                  </div>
                  <MobileNavLink href="#frutopia" label="All Value Packs" onClick={() => { setIsOpen(false); setIsProductsOpen(false); }} shouldShowSolidBackground={shouldShowSolidBackground} />
                  <MobileNavLink href="#frutopia" label="Drip Irrigation Kits" onClick={() => { setIsOpen(false); setIsProductsOpen(false); }} shouldShowSolidBackground={shouldShowSolidBackground} />
                </div>
              </div>
            </div>

            {/* Mobile Care Guides Dropdown */}
            <div>
              <button
                onClick={() => setIsCareGuidesOpen(!isCareGuidesOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 uppercase text-sm font-medium rounded-md transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
                  shouldShowSolidBackground
                    ? "text-gray-900 hover:bg-gray-100 focus:ring-offset-white"
                    : "text-white hover:bg-white/10 focus:ring-offset-black/60"
                )}
                aria-expanded={isCareGuidesOpen}
                aria-haspopup="true"
              >
                Care Guides
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isCareGuidesOpen && "rotate-180",
                    shouldShowSolidBackground ? "text-gray-900" : "text-white"
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isCareGuidesOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div 
                  className={cn(
                    "pl-4 pr-2 pt-2 space-y-1 overflow-y-auto",
                    "mobile-care-guides-scroll"
                  )}
                  style={{
                    maxHeight: '70vh',
                    scrollbarWidth: 'thin',
                    scrollbarColor: shouldShowSolidBackground ? 'rgb(209 213 219) transparent' : 'rgba(255, 255, 255, 0.3) transparent',
                  }}
                  data-solid-background={shouldShowSolidBackground}
                >
                  {seedlings.map((seedling) => (
                    <Link
                      key={seedling.id}
                      href={`/plant-care/${seedling.id}`}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        shouldShowSolidBackground
                          ? "text-gray-700 hover:text-green-700 hover:bg-green-50"
                          : "text-green-200 hover:text-white hover:bg-white/10"
                      )}
                      onClick={() => {
                        setIsOpen(false)
                        setIsCareGuidesOpen(false)
                      }}
                    >
                      {seedling.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <MobileNavLink href="#contact" label="Contact" onClick={() => setIsOpen(false)} shouldShowSolidBackground={shouldShowSolidBackground} />
          </nav>
        </div>
      </nav>

      {/* Mobile Cart Dropdown/Modal */}
      {isCartOpen && totalItems > 0 && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-[10000] flex items-end backdrop-overlay"
          style={{ pointerEvents: 'auto' }}
          onClick={(e) => {
            // Don't close if user is interacting with WhatsApp button
            if (isWhatsAppInteracting) {
              return
            }
            // CRITICAL: Only close if clicking directly on the backdrop element itself
            // Check multiple ways to ensure click is NOT inside cart:
            // 1. Check if target is the backdrop itself
            // 2. Check if click is inside cartContentRef
            // 3. Check if click is on any element with data-cart-content attribute
            // 4. Check if click is inside WhatsApp button ref
            const target = e.target as HTMLElement
            const clickedInsideCart = cartContentRef.current?.contains(target)
            const clickedOnCartContent = target?.closest('[data-cart-content="true"]')
            const clickedOnWhatsApp = whatsappButtonRef.current?.contains(target)
            const isBackdropClick = e.target === e.currentTarget
            
            // Only close if:
            // - Clicking directly on backdrop (not a child)
            // - AND not clicking inside cart content
            // - AND not clicking on cart content element
            // - AND not clicking on WhatsApp button
            if (isBackdropClick && !clickedInsideCart && !clickedOnCartContent && !clickedOnWhatsApp) {
              setIsCartOpen(false)
            }
          }}
          onMouseDown={(e) => {
            // Prevent mousedown from triggering handleClickOutside
            const clickedInsideCart = cartContentRef.current?.contains(e.target as Node)
            const clickedOnCartContent = (e.target as HTMLElement)?.closest('[data-cart-content="true"]')
            if (clickedInsideCart || clickedOnCartContent) {
              e.stopPropagation()
              e.stopImmediatePropagation()
            }
          }}
          onTouchStart={(e) => {
            // Prevent touch events from bubbling
            const clickedInsideCart = cartContentRef.current?.contains(e.target as Node)
            const clickedOnCartContent = (e.target as HTMLElement)?.closest('[data-cart-content="true"]')
            if (clickedInsideCart || clickedOnCartContent) {
              e.stopPropagation()
              e.stopImmediatePropagation()
            }
          }}
        >
          <div 
            ref={cartContentRef}
            className="w-full bg-white rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col cart-content overflow-hidden"
            style={{ 
              pointerEvents: 'auto',
              maxWidth: '100vw',
              width: '100%'
            }}
            onClick={(e) => {
              // Stop all clicks inside cart from bubbling to backdrop - exactly like desktop
              e.stopPropagation()
              e.stopImmediatePropagation()
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.stopImmediatePropagation()
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
              e.stopImmediatePropagation()
            }}
            data-cart-content="true"
          >
            <div 
              className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsCartOpen(false)
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                className="text-gray-500 hover:text-gray-700 transition"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div 
                  className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 min-h-0" 
                  style={{ WebkitOverflowScrolling: 'touch', pointerEvents: 'auto' }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-sm text-green-600 font-bold">KES {item.price.toLocaleString()}</p>
                      </div>
                      <div 
                        className="flex items-center gap-2 bg-white rounded-lg border border-green-200"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                      >
                        <button
                          onMouseDown={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            updateQuantity(item.id, item.quantity - 1)
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            updateQuantity(item.id, item.quantity - 1)
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            updateQuantity(item.id, item.quantity - 1)
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                          }}
                          className="p-1 hover:bg-gray-100 transition active:bg-gray-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-green-600" />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onMouseDown={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            updateQuantity(item.id, item.quantity + 1)
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            updateQuantity(item.id, item.quantity + 1)
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            updateQuantity(item.id, item.quantity + 1)
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                          }}
                          className="p-1 hover:bg-gray-100 transition active:bg-gray-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-green-600" />
                        </button>
                      </div>
                      <button
                        onMouseDown={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          removeFromCart(item.id)
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          removeFromCart(item.id)
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          removeFromCart(item.id)
                        }}
                        onTouchEnd={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                        className="text-red-500 hover:text-red-700 transition p-1 active:text-red-800"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div 
                  className="border-t border-gray-200 p-4 space-y-4 flex-shrink-0 bg-white w-full overflow-hidden"
                  style={{ 
                    maxWidth: '100%', 
                    width: '100%',
                    boxSizing: 'border-box',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    marginLeft: 0,
                    marginRight: 0
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <div 
                    className="relative z-[10001] w-full"
                    style={{
                      maxWidth: '100%',
                      width: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation()
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation()
                    }}
                    onTouchMove={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <label 
                      htmlFor="delivery-location-mobile" 
                      className="block text-sm font-medium text-gray-700 mb-2"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <div 
                      className="relative w-full" 
                      style={{ 
                        maxWidth: '100%', 
                        width: '100%',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        margin: 0,
                        padding: 0
                      }}
                    >
                      <select
                        ref={selectRef}
                        id="delivery-location-mobile"
                        value={deliveryLocation}
                        onChange={(e) => {
                          e.stopPropagation()
                          setDeliveryLocation(e.target.value)
                        }}
                        onClick={(e) => {
                          // Stop propagation - exactly like desktop version
                          e.stopPropagation()
                        }}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white text-sm relative z-[10001]"
                        required
                        style={{ 
                          position: 'relative', 
                          zIndex: 10001,
                          width: '100%',
                          maxWidth: '100%',
                          minWidth: 0,
                          boxSizing: 'border-box',
                          WebkitAppearance: 'menulist',
                          appearance: 'menulist',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          margin: 0,
                          paddingLeft: '0.75rem',
                          paddingRight: '0.75rem'
                        }}
                      >
                        <option value="">Select County</option>
                        {kenyanCounties.map((county) => (
                          <option key={county} value={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div 
                    className="space-y-2 border-t border-gray-200 pt-3"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Delivery Fee:</span>
                      <span className="text-sm font-bold text-red-600">Pending order confirmation</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-green-600">KES {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <div
                    ref={whatsappButtonRef}
                    className="w-full"
                    style={{
                      maxWidth: '100%',
                      width: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                    }}
                    onTouchMove={(e) => {
                      e.stopPropagation()
                      e.stopImmediatePropagation()
                    }}
                    data-cart-content="true"
                  >
                    <a
                      href={deliveryLocation ? `https://wa.me/254713764658?text=${generateWhatsAppMessage()}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseDown={(e) => {
                        // Set flag to prevent cart closing
                        setIsWhatsAppInteracting(true)
                        // CRITICAL: Stop all propagation immediately
                        e.stopPropagation()
                        e.stopImmediatePropagation()
                        if (!deliveryLocation) {
                          e.preventDefault()
                          setIsWhatsAppInteracting(false)
                          alert("Please select a delivery location")
                          return false
                        }
                        return false
                      }}
                      onClick={(e) => {
                        // Keep flag set during click
                        setIsWhatsAppInteracting(true)
                        // CRITICAL: Stop all propagation to prevent backdrop from closing cart
                        e.stopPropagation()
                        e.stopImmediatePropagation()
                        if (!deliveryLocation) {
                          e.preventDefault()
                          setIsWhatsAppInteracting(false)
                          alert("Please select a delivery location")
                          return false
                        }
                        // Reset flag after a delay to allow WhatsApp to open
                        setTimeout(() => {
                          setIsWhatsAppInteracting(false)
                        }, 1000)
                        return false
                      }}
                      onTouchStart={(e) => {
                        // Set flag to prevent cart closing
                        setIsWhatsAppInteracting(true)
                        // CRITICAL: Stop all propagation immediately
                        e.stopPropagation()
                        e.stopImmediatePropagation()
                        if (!deliveryLocation) {
                          e.preventDefault()
                          setIsWhatsAppInteracting(false)
                          alert("Please select a delivery location")
                          return false
                        }
                        return false
                      }}
                      onTouchEnd={(e) => {
                        // Keep flag set
                        setIsWhatsAppInteracting(true)
                        // CRITICAL: Stop all propagation
                        e.stopPropagation()
                        e.stopImmediatePropagation()
                        if (!deliveryLocation) {
                          e.preventDefault()
                          setIsWhatsAppInteracting(false)
                          alert("Please select a delivery location")
                          return false
                        }
                        // Reset flag after a delay to allow WhatsApp to open
                        setTimeout(() => {
                          setIsWhatsAppInteracting(false)
                        }, 1000)
                        return false
                      }}
                      onBlur={() => {
                        // Reset flag when focus leaves
                        setTimeout(() => {
                          setIsWhatsAppInteracting(false)
                        }, 200)
                      }}
                      data-cart-content="true"
                      className={cn(
                        "w-full font-bold py-3 rounded-lg transition text-center block shadow-md hover:shadow-lg",
                        deliveryLocation
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                      )}
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                        display: 'block'
                      }}
                    >
                      📱 Order on WhatsApp
                    </a>
                  </div>
                  <button
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      clearCart()
                      setIsCartOpen(false)
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      clearCart()
                      setIsCartOpen(false)
                    }}
                    className="w-full text-gray-600 font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm active:bg-gray-100"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Your cart is empty</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </header>
  )
}

// Desktop Nav Link Component with animated underline
function NavLink({ href, label, shouldShowSolidBackground = false }: { href: string; label: string; shouldShowSolidBackground?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 uppercase text-sm font-medium",
        "transition-colors duration-300",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded",
        "group",
        shouldShowSolidBackground
          ? "text-gray-900 hover:text-green-600"
          : "text-white hover:text-green-300"
      )}
      aria-label={label}
    >
      {label}
      {/* Animated underline - expands from center */}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 ease-out",
          "transform -translate-x-1/2",
          "group-hover:w-full w-0",
          shouldShowSolidBackground ? "bg-green-600" : "bg-green-300"
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

// Mobile Nav Link Component
function MobileNavLink({
  href,
  label,
  onClick,
  shouldShowSolidBackground = false,
}: {
  href: string
  label: string
  onClick: () => void
  shouldShowSolidBackground?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-4 py-3 uppercase text-sm font-medium rounded-md transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2",
        shouldShowSolidBackground
          ? "text-gray-900 hover:bg-gray-100 focus:ring-offset-white"
          : "text-white hover:bg-white/10 focus:ring-offset-black/60"
      )}
      aria-label={label}
    >
      {label}
    </Link>
  )
}

