"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to static HTML file for Decap CMS
    // The static file at /admin/index.html is better suited for CMS
    if (typeof window !== "undefined") {
      window.location.href = "/admin/index.html"
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#07090d]">
      <p className="text-gray-400">Loading admin interface...</p>
    </div>
  )
}

