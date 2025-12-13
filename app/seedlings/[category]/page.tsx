import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"
import ProductCard from "@/components/product-card"
import { seedlings } from "@/lib/seedlings-data"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { BreadcrumbSchema, ProductSchema } from "@/components/structured-data"
import { categories } from "./metadata"


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

function SeedlingsCategoryContent({
  category,
  categoryData,
  seedlings
}: {
  category: string
  categoryData: (typeof categories)[string]
  seedlings: Array<any>
}) {
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-[#07090d]">
      <Navbar />
      {seedlings.map((seedling) => (
        <ProductSchema key={seedling.id} seedling={seedling} />
      ))}

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryData.bgColor} opacity-30`}
          style={{
            backgroundImage: `url(${categoryData.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#seedlings"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </Link>

          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{categoryData.icon}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {categoryData.label} Varieties
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              {categoryData.description}
            </p>
            <p className="text-gray-400 mt-4">
              {seedlings.length} {seedlings.length === 1 ? 'variety' : 'varieties'} available
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {seedlings.map((seedling) => (
              <ProductCard key={seedling.id} seedling={seedling} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  )
}

