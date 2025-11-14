"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
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
      const heroHeight = window.innerHeight
      
      // Check if scrolled past hero section (50% of viewport height)
      const scrolled = scrollY > heroHeight * 0.5
      setIsScrolled(scrolled)

      // Check if navbar is over light sections
      const lightSectionIds = ['seedlings', 'care-guides', 'testimonials', 'contact']
      const navbarHeight = 80 // Approximate navbar height
      
      let overLightSection = false
      lightSectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if navbar area (top to navbarHeight) overlaps with light section
          // Navbar is at top, so check if section starts before navbar ends
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        shouldShowSolidBackground
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/40 via-black/30 to-transparent backdrop-blur-md"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 z-50 relative">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-white hover:text-green-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded relative z-10"
              aria-label="Mynzagric Home"
            >
              MYNZAGRIC
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 space-x-1">
            <NavLink href="#about" label="About" />
            <NavLink href="#seedlings" label="Seedlings" />

            {/* Care Guides Dropdown */}
            <div
              ref={dropdownRef}
              className="relative group"
              onMouseEnter={() => {
                setIsCareGuidesOpen(true)
                setActiveDropdown("care-guides")
              }}
              onMouseLeave={() => {
                setIsCareGuidesOpen(false)
                setActiveDropdown(null)
              }}
            >
              <button
                className={cn(
                  "relative px-4 py-2 text-white uppercase text-sm font-medium transition-colors duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded",
                  "hover:text-green-300"
                )}
                aria-expanded={isCareGuidesOpen}
                aria-haspopup="true"
                aria-label="Care Guides Menu"
                onKeyDown={(e) => handleKeyDown(e, () => setIsCareGuidesOpen(!isCareGuidesOpen))}
              >
                Care Guides
                <ChevronDown
                  className={cn(
                    "inline-block ml-2 w-4 h-4 transition-transform duration-300",
                    isCareGuidesOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
                {/* Animated underline - expands from center on hover or when open */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 h-0.5 bg-green-300 transition-all duration-300 ease-out",
                    "transform -translate-x-1/2",
                    "group-hover:w-full",
                    isCareGuidesOpen ? "w-full" : "w-0"
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu - Centered below button */}
              <div
                className={cn(
                  "absolute mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-100 z-50",
                  "transition-all duration-300 ease-out",
                  "left-1/2 -translate-x-1/2",
                  isCareGuidesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                )}
                role="menu"
                aria-orientation="vertical"
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
            </div>

            <NavLink href="#contact" label="Contact" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent transition-colors"
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
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
          aria-hidden={!isOpen}
        >
          <nav className="py-4 space-y-1 bg-black/60 backdrop-blur-md rounded-lg mt-2">
            <MobileNavLink href="#about" label="About" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="#seedlings" label="Seedlings" onClick={() => setIsOpen(false)} />

            {/* Mobile Care Guides Dropdown */}
            <div>
              <button
                onClick={() => setIsCareGuidesOpen(!isCareGuidesOpen)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-white uppercase text-sm font-medium",
                  "hover:bg-white/10 rounded-md transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black/60"
                )}
                aria-expanded={isCareGuidesOpen}
                aria-haspopup="true"
              >
                Care Guides
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isCareGuidesOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isCareGuidesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="pl-4 pr-2 pt-2 space-y-1">
                  {seedlings.map((seedling) => (
                    <Link
                      key={seedling.id}
                      href={`/plant-care/${seedling.id}`}
                      className="block px-3 py-2 text-sm text-green-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
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

            <MobileNavLink href="#contact" label="Contact" onClick={() => setIsOpen(false)} />
          </nav>
        </div>
      </nav>
    </header>
  )
}

// Desktop Nav Link Component with animated underline
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-white uppercase text-sm font-medium",
        "transition-colors duration-300",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded",
        "hover:text-green-300 group"
      )}
      aria-label={label}
    >
      {label}
      {/* Animated underline - expands from center */}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 h-0.5 bg-green-300",
          "transition-all duration-300 ease-out",
          "transform -translate-x-1/2",
          "group-hover:w-full w-0"
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
}: {
  href: string
  label: string
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-4 py-3 text-white uppercase text-sm font-medium",
        "hover:bg-white/10 rounded-md transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black/60"
      )}
      aria-label={label}
    >
      {label}
    </Link>
  )
}

