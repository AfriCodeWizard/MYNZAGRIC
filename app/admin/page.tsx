"use client"

import { useEffect } from "react"

export default function AdminPage() {
  useEffect(() => {
    // Redirect to static HTML file to avoid React conflicts
    // Decap CMS uses its own React instance which conflicts with Next.js React
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

