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

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("mynzagric-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mynzagric-cart", JSON.stringify(cart))
  }, [cart])

  // Check if there's a backup cart
  const hasBackupCart = () => {
    const backup = localStorage.getItem("mynzagric-cart-backup")
    return backup !== null && backup !== "[]"
  }

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
    // Save current cart as backup before clearing
    if (cart.length > 0) {
      localStorage.setItem("mynzagric-cart-backup", JSON.stringify(cart))
    }
    setCart([])
  }

  const restoreCart = () => {
    const backup = localStorage.getItem("mynzagric-cart-backup")
    if (backup) {
      try {
        const backupCart = JSON.parse(backup)
        setCart(backupCart)
        // Remove backup after restoring
        localStorage.removeItem("mynzagric-cart-backup")
      } catch (error) {
        console.error("Error restoring cart from backup:", error)
      }
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        restoreCart,
        hasBackupCart: hasBackupCart(),
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

