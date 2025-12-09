"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  restoreCart: () => void
  hasBackupCart: boolean
  totalItems: number
  totalPrice: number
  showCartNotification: boolean
  setShowCartNotification: (show: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCartNotification, setShowCartNotification] = useState(false)
  const [hasBackupCart, setHasBackupCart] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    const savedCart = localStorage.getItem("mynzagric-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
    // Check for backup cart on mount
    const backup = localStorage.getItem("mynzagric-cart-backup")
    setHasBackupCart(backup !== null && backup !== "[]")
  }, [])

  // Save cart to localStorage whenever it changes
  // Skip saving if cart is being cleared (empty array) and backup exists
  useEffect(() => {
    if (typeof window === "undefined") return
    // Only save if cart has items, or if it's empty and there's no backup (meaning it was intentionally cleared)
    const hasBackup = localStorage.getItem("mynzagric-cart-backup")
    if (cart.length > 0 || !hasBackup) {
      localStorage.setItem("mynzagric-cart", JSON.stringify(cart))
    } else if (cart.length === 0 && hasBackup) {
      // Cart was cleared, ensure localStorage is also cleared
      localStorage.setItem("mynzagric-cart", JSON.stringify([]))
    }
    // Update hasBackupCart state
    setHasBackupCart(hasBackup !== null && hasBackup !== "[]")
  }, [cart])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        const updated = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
        setShowCartNotification(true)
        setTimeout(() => setShowCartNotification(false), 2000)
        return updated
      }
      const updated = [...prevCart, { ...item, quantity: 1 }]
      setShowCartNotification(true)
      setTimeout(() => setShowCartNotification(false), 2000)
      return updated
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    if (typeof window === "undefined") return
    // Get current cart state directly from state to avoid stale closure
    setCart((currentCart) => {
      // Save current cart as backup before clearing
      if (currentCart.length > 0) {
        localStorage.setItem("mynzagric-cart-backup", JSON.stringify(currentCart))
        // Also clear the main cart storage immediately
        localStorage.setItem("mynzagric-cart", JSON.stringify([]))
        setHasBackupCart(true)
      }
      return []
    })
  }

  const restoreCart = () => {
    if (typeof window === "undefined") return
    const backup = localStorage.getItem("mynzagric-cart-backup")
    if (backup) {
      try {
        const backupCart = JSON.parse(backup)
        setCart(backupCart)
        // Remove backup after restoring
        localStorage.removeItem("mynzagric-cart-backup")
        setHasBackupCart(false)
      } catch (error) {
        console.error("Error restoring cart from backup:", error)
      }
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  // Calculate total price excluding items with price 0 (flowers and trees - price on request)
  const totalPrice = cart.reduce((sum, item) => {
    if (item.price > 0) {
      return sum + item.price * item.quantity
    }
    return sum
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        restoreCart,
        hasBackupCart,
        totalItems,
        totalPrice,
        showCartNotification,
        setShowCartNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

