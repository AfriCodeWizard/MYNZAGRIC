import { use } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { BreadcrumbSchema } from "@/components/structured-data"
import { seedlings } from "@/lib/seedlings-data"
import { categories } from "./metadata"
import SeedlingsCategoryContent from "./category-content"


export default function SeedlingsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const category = categories[resolvedParams.category]
  const categorySeedlings = seedlings.filter((s) => s.category === resolvedParams.category)

  if (!category || categorySeedlings.length === 0) {
    return (
      <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <Link href="/#seedlings" className="text-green-400 hover:text-green-300">
            Back to Seedlings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Seedlings", url: "/#seedlings" },
        { name: category.label, url: `/seedlings/${resolvedParams.category}` }
      ]} />
      <SeedlingsCategoryContent 
        category={resolvedParams.category}
        categoryData={category}
        seedlings={categorySeedlings}
      />
    </>
  )
}

