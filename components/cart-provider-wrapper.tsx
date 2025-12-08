"use client"

import { CartProvider } from "@/contexts/cart-context"

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <CartProvider>{children}</CartProvider>
}

