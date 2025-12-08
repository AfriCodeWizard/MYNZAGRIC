import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
      <Navbar />
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Story Not Found</h1>
        <p className="text-gray-400 mb-6">The success story you're looking for doesn't exist.</p>
        <Link
          href="/impact"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Impact</span>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

