"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { seedlings } from "@/lib/seedlings-data"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCareGuidesOpen, setIsCareGuidesOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverLightSection, setIsOverLightSection] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCareGuidesOpen(false)
        setActiveDropdown(null)
      }
    }

    if (isCareGuidesOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCareGuidesOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setIsCareGuidesOpen(false)
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
      className="fixed top-0 left-0 right-0 z-50 w-full pt-4"
      style={{ pointerEvents: "none" }}
    >
      {/* Animated Background Layer - Drops from top with padding */}
      <div
        className={cn(
          "absolute top-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 transition-all duration-500 ease-in-out",
          shouldShowSolidBackground
            ? "bg-white shadow-lg opacity-100 translate-y-0 rounded-[10px]"
            : "bg-white opacity-0 -translate-y-full shadow-none rounded-[10px]"
        )}
        style={{
          transition: "opacity 500ms ease-in-out, transform 500ms ease-in-out, box-shadow 500ms ease-in-out",
          pointerEvents: "none",
          overflow: "visible",
          height: "calc(100% - 1rem)",
          zIndex: 1,
        }}
      />

      {/* Navbar Content - Always visible on transparent background */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Main navigation" style={{ overflow: "visible", pointerEvents: "auto" }}>
        <div className="flex justify-between items-center h-16 md:h-20 relative" style={{ overflow: "visible" }}>
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
            <NavLink href="#seedlings" label="Seedlings" shouldShowSolidBackground={shouldShowSolidBackground} />

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
            <MobileNavLink href="#seedlings" label="Seedlings" onClick={() => setIsOpen(false)} shouldShowSolidBackground={shouldShowSolidBackground} />

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

